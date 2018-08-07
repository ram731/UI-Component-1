import { Component, ViewChild,ChangeDetectorRef, AfterViewChecked  } from '@angular/core';
import { Router, ActivatedRoute,  RoutesRecognized, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Utils } from './shared/Utils';
import { SessionTimeOutModalComponent } from './shared/modals/session-timeout/timeout.component';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked{
  @ViewChild(SessionTimeOutModalComponent) sessionTimeoutModal: SessionTimeOutModalComponent;

  pageTitle = 'AZPDES MS4 GENERAL PERMIT COVERAGE';
  pageClass: string;  
  reviewComments:any[]=null;
  toggledSaveExit = false;
  placeBarRequired: boolean=false;
  currentComponent:any=null;
  constructor(
    public utils: Utils,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service : AppService,
    private cdRef: ChangeDetectorRef

  ) {

    router.events.subscribe(e => {      
      if(window.location.pathname.endsWith('confirmation')){
        this.utils.isConfirmationPage = true;
      }
      else{
        this.utils.isConfirmationPage = false;
      }
      if (e instanceof RoutesRecognized) {        
        const root = e.state.root.firstChild;
        const child = root && root.firstChild ? root.firstChild : null;
        let data: any = root && root.data ? root.data : { title: '' };
        const queryParams: any = root.queryParamMap;
        if (!data.title && child) {
          data = child.data ? child.data : { title: '' };
        }

        if (!this.utils.glbReqId && queryParams && queryParams.params['glbReqId']) {
          this.utils.glbReqId = queryParams.params['glbReqId'];
        }

        this.pageClass = data.pageClass;
        this.pageTitle = data.title ? data.title : this.pageTitle;
        titleService.setTitle(this.pageTitle);
        utils.path = utils.path ? utils.path : root.url[0].path;
        if(data.currentPage){
          this.utils.currentPageName = data.currentPage;
        }

        if(data.currentResourceBundlePath){
          this.utils.currentResourceBundlePath = data.currentResourceBundlePath;
        } 
        else{
          this.utils.currentResourceBundlePath='common';
        }       

        if (data.placeBarRequired != undefined){
          this.placeBarRequired = data.placeBarRequired;
        }
        //To show save and exit button       
        if (data.showSaveAndExit != undefined) {
          this.utils.showSaveAndExit = data.showSaveAndExit;
        }
        else {
          this.utils.showSaveAndExit = true;
        }

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


   /*  this.utils.pageDataLoadObservable.subscribe((val) => {      
      if(val == true){
        if (this.placeBarRequired) {
         // this.initPlaceBar();
        } else {
          this.utils.placeName = null;
          this.utils.placeAddress = null;
        }
      }
     }); */

  }
  private initPlaceBar() {
    if (this.utils.placeName) {
      return;
    }
    let placeID = this.activatedRoute.snapshot.queryParamMap.get('place_id');
    const stagingPlaceID = this.activatedRoute.snapshot.queryParamMap.get('stage_id');
    const companyCustID = this.activatedRoute.snapshot.queryParamMap.get('cust_id');   
    if(!parseInt(placeID)){
      placeID = this.activatedRoute.snapshot.queryParamMap.get('placeId');
    }

    if (parseInt(placeID)|| this.utils.placeID) {
      if (placeID) {
        this.utils.placeID = parseInt(placeID);
      }
      this.getPlaceDetailsByPlaceId(this.utils.placeID);
    } else if (stagingPlaceID && companyCustID) {
      this.getPlaceDetailsByStagingID(stagingPlaceID, companyCustID);
    } else {
      this.getPlaceDetailsByGlbReqId();
    }

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
          this.resetPlaceBar()
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

  onActivate(event:any){    
    setTimeout(()=>{      
      this.currentComponent = event; 
      if(typeof  this.currentComponent.setPageReview === "function"){
        this.currentComponent.setPageReview(this);
      }
      
    },300);
  }

  onDeactivate(event:any){
    setTimeout(()=>{
      this.utils.reviewComments=null;
      this.currentComponent=null;
    },0);
  }

  ngAfterViewChecked() {       
    this.cdRef.detectChanges();
}

  toggledropdown = () => {
    this.toggledSaveExit = !this.toggledSaveExit;
  }
  
  editPage(event:any){
    if(this.currentComponent){
      this.currentComponent.approveEdit();
    }
    
  }
}
