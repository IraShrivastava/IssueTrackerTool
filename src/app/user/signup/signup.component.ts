/*import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;

  constructor(public appService: AppService, public router: Router, public toastr: ToastrManager) { }
  ngOnInit() { }

  public goToSignIn: any = () => {
    this.router.navigate(['/']);
  }

  public signupFunction: any = () => {
    if (!this.firstName) {
      this.toastr.warningToastr('enter first name')
    } else if (!this.lastName) {
      this.toastr.warningToastr('enter last name')
    } else if (!this.mobile) {
      this.toastr.warningToastr('enter mobile')
    } else if (!this.email) {
      this.toastr.warningToastr('enter email')
    } else if (!this.password) {
      this.toastr.warningToastr('enter password')
    } else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
      }

      console.log(data);

      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.toastr.successToastr('Signup successful');

            setTimeout(() => {

              this.goToSignIn();

            }, 1000);

          } else {

            this.toastr.errorToastr(apiResponse.message);

          }

        }, (err) => {

          this.toastr.errorToastr('some error occured');

        });

    } // end condition
  }

}

*/


import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;

  constructor(  
    public appService: AppService,
    public router: Router,
    private toastr: ToastrManager,
   ) {
      //this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
  }

  public goToSignIn: any = () => {

    this.router.navigate(['/']);

  } // end goToSignIn

  public signupFunction: any = () => {

    if (!this.firstName) {
      this.toastr.warningToastr('enter first name')
    } else if (!this.lastName) {
      this.toastr.warningToastr('enter last name')
    } else if (!this.mobile) {
      this.toastr.warningToastr('enter mobile')
    } else if (!this.email) {
      this.toastr.warningToastr('enter email')
    } else if (!this.password) {
      this.toastr.warningToastr('enter password')
    } 
    else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
      }
      console.log(data);
      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {
          console.log(apiResponse);  
        if (apiResponse.status === 200) {
            this.toastr.successToastr('Signup successful');
            setTimeout(() => {
              this.goToSignIn();
            }, 2000);
          } else {
            this.toastr.errorToastr(apiResponse.message);
          }
        }, (err) => {
          this.toastr.errorToastr('some error occured');
        });
    } // end condition
  } // end signupFunction
}

