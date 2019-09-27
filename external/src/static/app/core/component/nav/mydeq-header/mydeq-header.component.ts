import { Component, OnInit, Input } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

interface HeaderDetails{
  first_name?:string,
  last_name?:string
}

/**
 * Page header component.
 */
@Component({
  selector: 'mydeq-header',
  templateUrl: './mydeq-header.component.html',
  styles: [
    `
    .navbar {
      padding-bottom: 0
    }

    .header-nav {
      border-bottom: 4px solid #5c8885;
      margin-bottom: 20px;
    }

    .nav-item:not(:first-child) {
        margin-top: -0.5rem;
        border-right: 1px solid #ccc;
        height: 75px;
    }

    .nav-link {
      color: #604543;
      padding-top: 30px;
      padding-bottom: 20px;
    }

    .nav-link:focus, .nav-link:hover {
        color: #5c8885;
    }

    #userNameLabel {
      padding-top: 25px;
      padding-bottom: 20px;
    }



    `
  ]
})
export class MydeqHeaderComponent implements OnInit {

  @Input('headerDetail') headerDetail:HeaderDetails = {first_name:null,last_name:null};
  localStorageKey = 'visitedAppList';
  myAppList: string[] = [];
  observerList$: Observable<any>[] = [];
  context: string;
  
  constructor() { 
   this.context = window.location.pathname.substring(1, window.location.pathname.indexOf('/', 2));
   const appList: string[] = this.getFromSessionStorage(this.localStorageKey);
   this.myAppList = appList ? appList.filter(f => f !== this.context).concat([this.context]) : [this.context];
   localStorage.setItem(this.localStorageKey, JSON.stringify(this.myAppList));
  }

  ngOnInit() {
    
  }
  
  logoutMe() {
    this.myAppList.forEach(app => {     
      if(app!=this.context){
        this.observerList$.push(this.service.logoutMe(app));
      }      
    });

    if(this.observerList$ && this.observerList$.length > 0){
      forkJoin(this.observerList$).subscribe(
        response => {
          this.redirectToLogout();
        },
        error => {
          this.redirectToLogout();
        });
    }
    else{
      this.redirectToLogout();
    }
    
  }

  getFromSessionStorage(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from sessionStorage', e);
      return null;
    }
  }

  redirectToLogout() {
    window.open('logout', '_self');
    localStorage.setItem(this.localStorageKey, JSON.stringify([]));
  }

}
