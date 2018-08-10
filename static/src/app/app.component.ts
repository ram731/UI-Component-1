import { Component, ViewChild, ChangeDetectorRef, AfterViewChecked, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, NavigationEnd, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Utils } from './shared/Utils';
import { SessionTimeOutModalComponent } from './shared/modals/session-timeout/timeout.component';
import { AppService } from './service/app.service';
import { ConfigCacheService } from './shared/lib/component-config/config-cache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked, OnInit, AfterViewInit {
  @ViewChild(SessionTimeOutModalComponent) sessionTimeoutModal: SessionTimeOutModalComponent;

  pageClass: string = 'default-page';
  reviewComments: any[] = null;
  toggledSaveExit = false;
  showSaveAndExit: boolean = false;
  placeBarRequired: boolean = false;
  currentComponent: any = null;
  
  private configCacheService: ConfigCacheService = null;
  constructor(
    public utils: Utils,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: AppService,
    private cdRef: ChangeDetectorRef) {

    this.configCacheService = ConfigCacheService.getInstane();
    router.events.subscribe(e => {
      if (window.location.pathname.endsWith('confirmation')) {
        this.utils.isConfirmationPage = true;
      }
      else {
        this.utils.isConfirmationPage = false;
      }
      if (e instanceof RoutesRecognized) {
        const root = e.state.root.firstChild;
        const queryParams: any = root.queryParamMap;
        if (!this.utils.glbReqId && queryParams && queryParams.params['glbReqId']) {
          this.utils.glbReqId = queryParams.params['glbReqId'];
        }
     
        utils.path = utils.path ? utils.path : (root.routeConfig.path ? root.routeConfig.path : '');
        utils.pageURL = e.url;

      } else if (e instanceof NavigationEnd) {
        if (e.url.indexOf('glbReqId') > 0) {
          this.utils.removeGlobalRequestID()
        }

        if (this.sessionTimeoutModal) {
          this.sessionTimeoutModal.exdentSession();
        }
        window.scrollTo(600, 0);
      }
    });

  }

  onActivate(event: any) {
    this.currentComponent = event;
    if ( this.configCacheService.getMetadata(event.constructor.name)) {
    this.showSaveAndExit = this.configCacheService.showSaveAndExit(event.constructor.name);
    this.placeBarRequired = this.configCacheService.isPlaceBarRequired(event.constructor.name);
    this.configCacheService.getTitle(event.constructor.name);
    this.titleService.setTitle(this.utils.pageTitle);
    }
    this.router.navigateByUrl(window.location.pathname);
  }

  onDeactivate(event: any) {
    setTimeout(() => {
      this.utils.reviewComments = null;
      this.currentComponent = null;
    }, 0);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    if (!this.utils.userDetails.first_name) {
      this.service.getServiceCall(null, null, '/mydeq/service/user').subscribe(
        response => {
          this.utils.userDetails = response;
        },
        error => {
        });
    }
  }

  ngAfterViewInit() {
    this.sessionTimeoutModal.init();
    if (this.placeBarRequired) {
      this.initPlaceBar();
    }
  }

  private initPlaceBar() {
    if (this.utils.placeName) {
      return;
    }

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const placeID = params['placeId'] && params['placeId'] !== 'null' ? params['placeId'] : undefined;
      const stagingPlaceID = params['stage_id'] && params['stage_id'] !== 'null' ? params['stage_id'] : undefined;
      const companyCustID = params['cust_id'] && params['cust_id'] !== 'null' ? params['cust_id'] : undefined;
      const glbReqId = params['glbReqId'] ? params['glbReqId'] : undefined;
      if (parseInt(placeID, 10) || this.utils.placeID) {
        if (placeID) {
          this.utils.placeID = parseInt(placeID, 10);
        }
        this.getPlaceDetailsByPlaceId(this.utils.placeID);
      } else if (stagingPlaceID && companyCustID) {
        this.getPlaceDetailsByStagingID(stagingPlaceID, companyCustID);
      } else if (glbReqId) {
        this.getPlaceDetailsByGlbReqId();
      }
    });
  }

  private getPlaceDetailsByPlaceId = (finalPlaceId: number) => {
    if (finalPlaceId) {
      this.service
        .getPlaceDetailsByPlaceID(finalPlaceId + '')
        .subscribe(
          recievedResponse => {
            this.setPlaceBarObj(recievedResponse);
          },
          error => {
            /* Ignored error */
            this.resetPlaceBar();
          });
    }
  }

  private getPlaceDetailsByStagingID = (stagingPlaceID, companyCustID) => {
    if (!stagingPlaceID) {
      return;
    }
    this.service
      .getPlaceDetailsByStagingID(stagingPlaceID, companyCustID)
      .subscribe(
        recievedResponse => {
          this.setPlaceBarObj(recievedResponse);
        },
        error => {
          /* Ignored error */
          this.resetPlaceBar()
        });
  }


  private getPlaceDetailsByGlbReqId = () => {
    this.service
      .getPlaceDetailsByGlbReqId()
      .subscribe(
        recievedResponse => {
          this.setPlaceBarObj(recievedResponse);
        },
        error => {
          /* Ignored error */
        });
  }

  private setPlaceBarObj = (place: any) => {
    if (place.portPlaceName) {
      this.utils.placeName = place.portPlaceName;
    } else if (place.placeAltName) {
      this.utils.placeName = place.placeAltName;
    } else {
      this.utils.placeName = place.placeName;
    }
    this.utils.placeAddress = this.utils.getCompletePlacebarAddress(place.address);
    this.utils.placeBarObj = place;
  }

  private resetPlaceBar() {
    this.utils.placeName = null;
    this.utils.placeAddress = null;
  }

  saveAndExit = () => {
    this.utils.gotoMyApplications();
  }



  toggledropdown = () => {
    this.toggledSaveExit = !this.toggledSaveExit;
  }

  editPage(event: any) {
    if (this.currentComponent) {
      this.currentComponent.approveEdit();
    }

  }
}
