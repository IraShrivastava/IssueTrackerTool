//import { Component, OnInit } from '@angular/core';
import { Component, OnChanges, Input, EventEmitter, Output, OnInit, SimpleChanges } from '@angular/core';

import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
//import { FirstCharComponent } from './../../shared/first-char/first-char.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public userName: String;
  public firstChar: String;
  public searchData: String;
  public backlogs = [];
  public inProgress = [];
  public inTest = [];
  public done = [];
  public watch = []
  public assignedIssue = [];
  public allData
  public allSearchData: any = [];
  public notifications = [];
  public notifyData = [];
  public count = [];
  public toggler: boolean = true;
  public notifyToggler: boolean = false;

  constructor(private toastr: ToastrManager, public appService: AppService, public router: Router) { }

  ngOnInit() : void {

   // this._name=this.userName
    this.userName = Cookie.get('UserName')
    this.firstChar = this.userName[0];
    console.log(this.userName);
    //console.log(this.firstChar)

    this.appService.getAllIssue().subscribe(
      (apiResponse) => {
        this.allData = apiResponse['data'];
        if (this.allData !== null) {
          for (let x of this.allData) {
            if(x.assignedToId === Cookie.get('userId')){
              this.assignedIssue.push(x);
            }
            switch (x.status) {
              case 'Backlog':
                this.backlogs.push(x);
                break;
              case 'In-Progress':
                this.inProgress.push(x)
                break;
              case 'In-Test':
                this.inTest.push(x)
                break;
              case 'Done':
                this.done.push(x)
                break;
            }
          }
        }
      },
      (error) => {
        console.log(error)
      }
    )
    
    this.appService.getWatchList().subscribe(
      (response) => {
        for (let details of response['data']) {
          if (details.watcherId === Cookie.get('userId')) {
            if(this.allData !== null){
            for (let data of this.allData) {
              if (details.issueId === data.issueId) {
                this.watch.push(data)
              }
            }
          }
          }
        }
      }
    )

    this.appService.getNotification().subscribe(
      (apiResponse) => {
        this.notifications.push(apiResponse['data'])
        
        for (let x of this.notifications) {
          if(x !== null){
          for (let y of x) {
            if(y.notificationCount === 1){
            this.count.push(y.notificationCount)}
            let id = y.issueId
            for (let a of y.description) {
              let des = a
              let data = {
                issueId: id,
                descrip: des
              }
              this.notifyData.push(data)
            }
          }
        }
      }
        if(this.count.length===0){
          return this.notifyToggler = true
        }
      }
    )
  }


  public logout: any = () => {
    let conditioner = this.appService.getUserInfoFromLocalStorage().authToken
    if (conditioner !== undefined) {
      this.appService.logout()
        .subscribe(() => {
          Cookie.delete('authtoken')
          Cookie.delete('userId')
          Cookie.delete('UserName')
          this.router.navigate(['/'])
        })
    } else {
      this.appService.logOutWithGoogle()
        .subscribe(() => {
       //   console.log('hi');
          
          Cookie.delete('userId')
          Cookie.delete('UserName')
          this.router.navigate(['/'])
        })
    }

        
  }

  public scrollNextBacklog = () => {
    document.getElementById('scrollBacklog').scrollBy(100, 0)
  }

  public scrollPreviousBacklog = () => {
    document.getElementById('scrollBacklog').scrollBy(-100, 0)
  }

  public scrollNextProgress = () => {
    document.getElementById('scrollProgress').scrollBy(100, 0)
  }

  public scrollPreviousProgress = () => {
    document.getElementById('scrollProgress').scrollBy(-100, 0)
  }

  public scrollNextTest = () => {
    document.getElementById('scrollTest').scrollBy(100, 0)
  }

  public scrollPreviousTest = () => {
    document.getElementById('scrollTest').scrollBy(-100, 0)
  }

  public scrollNextDone = () => {
    document.getElementById('scrollDone').scrollBy(100, 0)
  }

  public scrollPreviousDone = () => {
    document.getElementById('scrollDone').scrollBy(-100, 0)
  }

  public scrollNextWatch = () => {
    document.getElementById('scrollWatch').scrollBy(100, 0)
  }

  public scrollPreviousWatch = () => {
    document.getElementById('scrollWatch').scrollBy(-100, 0)
  }

  public back = () => {
    return this.toggler = true
  }

  public notifyCount = () =>{
    this.appService.notifyCount().subscribe(
      (apiResponse)=>{
        if(apiResponse['status'] == 200){
          return this.notifyToggler = true
        }
      }
    )
  }


  public searchIssue: any = () => {
    this.appService.searchIssue(this.searchData).subscribe(
      (apiResponse) => {
        if (apiResponse['status'] == 200) {
          this.searchData = "";
          this.allSearchData = apiResponse['data'];
          return this.toggler = false
        } else if (apiResponse['status'] == 404) {
          this.toastr.infoToastr('No result Found')
        }
      },
      (error) => {
        console.log(error);
        this.toastr.errorToastr('Some error ocurred');
      }
    )

  }

  

}
