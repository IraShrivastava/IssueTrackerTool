import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from './../../app.service';
import { ToastrManager } from 'ng6-toastr-notifications';
//import { AuthService } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public socialRecord :any =[]
  public socialemail:any;
  public socialfname:any;
  public sociallname:any;
  public socialid:any;
  private user: {};
  private loggedIn: boolean;
  public email: any;
  public password: any;
  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrManager,
   // private authService:AuthService
  ) { }
  ngOnInit() {
    //this.authService.authState.subscribe((user) => {
      //this.user = user;
      //this.loggedIn = (user != null);
    //});
  }

  public goToSignUp: any = () => {
    this.router.navigate(['/sign-up']);
  } // end goToSignUp

  public signinFunction: any = () => {
    if (!this.email) {
      this.toastr.warningToastr('enter email')
    } else if (!this.password) {
      this.toastr.warningToastr('enter password')
    } else {
      let data = {
        email: this.email,
        password: this.password
      }
      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {
         // console.log('hi hi hi')
          if (apiResponse.status === 200) {
            console.log(apiResponse)
            Cookie.set('authtoken', apiResponse.data.authToken);
            Cookie.set('userId', apiResponse.data.userDetails.userId);
            Cookie.set('UserName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
           // console.log(apiResponse.data);
            this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.errorToastr(apiResponse.message)
          }
        }, (err) => {
          this.toastr.errorToastr('some error occured')
        });
    } // end condition
  } // end signinFunction

  
  public googleLogin: any =()=>{
    window.open('http://localhost:3000/auth/google', "mywindow","location=1,status=1,scrollbars=1, width=800,height=800")
    let listener = window.addEventListener('message', (message) => {
      console.log(message)
      this.appService.setUserInfoInLocalStorage(message.data.user)
      Cookie.set('userId', message.data.user.userId);
      Cookie.set('UserName', message.data.user.firstName + ' ' + message.data.user.lastName);
      this.router.navigate(['/dashboard'])
    });
    
  }
  

}
