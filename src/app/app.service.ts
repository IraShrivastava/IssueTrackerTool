import { Injectable } from '@angular/core';
/* for signin and signup func */
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
/* end of import for signin and signup func */



@Injectable()
export class AppService {
  
  headers = new HttpHeaders()

  private url ='http://localhost:3000';
  constructor(public http: HttpClient, public router:Router) { }

  public getUserInfoFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage

  public setUserInfoInLocalStorage = (data) =>{

    //console.log("setting info.");
    localStorage.setItem('userInfo', JSON.stringify(data))
    //console.log("info set");

  }

  public isLoggedIn() {
    return(this.getUserInfoFromLocalStorage())
  }

  /*signin and signup func*/
  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName',data.firstName)
      .set('lastName',data.lastName)
      .set('mobile',data.mobile)
      .set('email',data.email)
      .set('password',data.password)
      //let trial1= this.http.post(`${this.url}/api/v1/users/signup`,params);
      //console.log(trial1);
      //return trial1;
      return this.http.post(`${this.url}/api/v1/users/signup`,params);
  }
  public signinFunction(data): Observable<any> {
    //console.log('hi from signin');
    const params = new HttpParams()
    .set('email',data.email)
    .set('password',data.password);
    let trial1 = this.http.post(`${this.url}/api/v1/users/login`,params);
    //console.log(trial1);
    return trial1;
  }

  public logout():Observable<any> {
    const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))

    return this.http.post(`${this.url}/api/v1/users/logout`,params);
  }

 public logOutWithGoogle(): Observable<any> {
   return this.http.get(`${this.url}/api/logout`)
  }

  public allRegisterUsers(): Observable<any>{
    
    let trial=this.http.get(`${this.url}/api/v1/users/view/all`);
    //console.log(trial);
    return trial;
  }

  public allSocialUsers(): Observable<any>{
    let trial1=this.http.get(`${this.url}/api/v1/users/view/socialAll`)
    //console.log(trial1)
    return trial1;
  
  }

  public createIssue(data): Observable<any>{

    const params = new HttpParams()
      .set('reporter',data.reporter)
      .set('title',data.title)
      .set('description',data.description)
      .set('reporterId',data.reporterId)
      .set('status',data.status)
      .set('assignedToId',data.assignedToId)
      .set('assignedTo',data.assignedTo)
      .set('images', data.images)

    return this.http.post(`${this.url}/api/issue/create`,params)
  }

  public getAllIssue(): Observable<any>{
    return this.http.get(`${this.url}/api/issue/all`)
  }

  public getSingleIssue = (issueId)=>{
    return this.http.get(`${this.url}/api/view/${issueId}`);
  }

  public deleteIssue = (issueId)=>{
    let data = {}
    return this.http.post(`${this.url}/api/issue/${issueId}/delete`, data)
  }

  public editIssue = (data)=>{
    const params = new HttpParams()
      .set('title',data.title)
      .set('issueId', data.issueId)
      .set('reporter', data.reporter)
      .set('reporterId', data.reporterId)
      .set('description',data.description)
      .set('status',data.status)
      .set('assignedToId',data.assignedToId)
      .set('assignedTo',data.assignedTo)
      .set('images', data.images)
    return this.http.post(`${this.url}/api/issue/${data.issueId}/edit`, params)
  }

  public getAllAttachments = ()=>{
    return this.http.get(`${this.url}/api/file`)
  }

  public downloadAttachment =(file)=>{

      return this.http.get(`${this.url}/api/download/${file}`, 
        { responseType: 'blob', 
          headers: {'Content-type': 'text/xml'}
        }); 
  }

  public searchIssue = (arg,skip=0)=>{
    return this.http.get(`${this.url}/api/issue/search?arg=${arg}&skip=${skip}`);
  }

  public postWatch = (data)=>{
    const params = new HttpParams()
      .set('issueId', data)
      .set('watcherId', Cookie.get('userId'))
      .set('userId',Cookie.get('userId'))
      .set('userName',Cookie.get('UserName'))
      console.log(Cookie.get('UserName'))
      console.log('issue id create'+ data);
      console.log('user id create '+ Cookie.get('userId'))

      return this.http.post(`${this.url}/api/watch`, params)
  }
  public postUnwatch = (issueId) => {
    const params = new HttpParams()
    .set('issueId',issueId)
    .set('userId',Cookie.get('userId'))
    console.log('issue id remove'+ issueId);
    console.log('user id remove '+ Cookie.get('userId'))
    return this.http.post(`${this.url}/deletewatch/`, params)
  }

  public getWatchList = () =>{
    return this.http.get(`${this.url}/api/getwatcher`)
  }

  public watcherList = (issueId) => {
    return this.http.get(`${this.url}/api/watcher/${issueId}`)
  }

  public addComment = (commentData)=>{
    const params = new HttpParams()
      .set('issueId',commentData.issueId)
      .set('description',commentData.description)
      .set('reporter',Cookie.get('UserName'))
      .set('reporterId',Cookie.get('userId'))

    return this.http.post(`${this.url}/api/addcomment`,params);
  }

  public getComment = (issueId) =>{
    return this.http.get(`${this.url}/api/readcomment/${issueId}`)
  }

  public getNotification = () =>{
      return this.http.get(`${this.url}/api/notification/${Cookie.get('userId')}`)
  }

  public notifyCount = () =>{
    const params = new HttpParams()
      .set('userId', Cookie.get('userId'))
      return this.http.post(`${this.url}/api/notifycount`, params)
  }


  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

}
