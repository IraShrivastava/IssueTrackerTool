import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from './../../app.service';
import { Location } from '@angular/common';
import { saveAs } from 'file-saver';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-issue-view',
  templateUrl: './issue-view.component.html',
  styleUrls: ['./issue-view.component.css'],
  providers: [Location]
})
export class IssueViewComponent implements OnInit {
  public watchData:any=[]
 // public currentIssue;
  public text: String ='Watch'
  public responseData: any
  public attachmentList = []
  public filedId = []
  public fileName = []
  public comment:String;
  public commentData:any;
  public makeComment:any;
  public issueId:any;
  public watchers = []
  constructor(private toastr: ToastrManager ,private _route: ActivatedRoute, private appService: AppService, private location: Location, public router: Router) { }

  ngOnInit() {
     this.issueId = this._route.snapshot.paramMap.get('issueId');
    console.log('issueId'+ this.issueId)

    this.appService.getSingleIssue(this.issueId).subscribe((response) => {
        if (response["status"] === 200) {
          this.responseData = response['data']
          this.watchData.push(this.responseData)
          for (let imgId of this.responseData.images) {
            this.filedId.push(imgId)
          }
        } else {
          this.toastr.infoToastr('No Issue Found')
        }
      }
    )

    this.appService.getAllAttachments().subscribe(
      (response) => {
        this.attachmentList.push(response['data'])
        for (let x of this.attachmentList) {
          for (let y of x) {
            for (let a of this.filedId) {
              if (a === y._id) {
                this.fileName.push(y.filename)
              }
            }
          }
        }
      }
    )
    this.getComment()
  }

  public getComment = () =>{
    this.appService.getComment(this.issueId).subscribe(
      (response)=>{
        this.commentData = response['data'];
      }
    )
  }

  public goBack(): any {
    this.location.back();
  }

  public download = (index) => {
    let fileId = this.fileName[index]
    this.appService.downloadAttachment(fileId).subscribe(
      (response) => {
        saveAs(response, response['filename'])
      }
    )
  }

  public deleteIssue = () =>{
    this.appService.deleteIssue(this.issueId)
      .subscribe(
        (response)=>{
          this.toastr.successToastr(response['message'])
          setTimeout(()=>{
            this.router.navigate(['/dashboard']);
          },1000)
        }
      )

  }

  public watch = () =>{
    if(this.text === 'Watch') 
    { 
      this.text = 'Unwatch ';
      this.appService.postWatch(this.issueId).subscribe(
        (response)=>{
            this.toastr.successToastr(response['message'])
        }
      )
    }
    else
    {
    //  console.log('hi from unwatch')
      this.text= 'Watch';
      this.appService.postUnwatch(this.issueId).subscribe(
        (response)=>{
          this.toastr.successToastr(response['message'])
        }
      )
    }
    
  }

  public allwatchers = () =>{
    let watchers=[]
    this.appService.watcherList(this.issueId)
    .subscribe((apiResponse)=>{
     if(apiResponse['status']===200){
      //console.log(apiResponse['data'])
       for(let x of apiResponse['data']){
      //   console.log(apiResponse['data'])
         watchers.push(x)
       }
     }
     console.log(watchers)
      for(let y of watchers){
      console.log(y)
     }
    })
  }

  public addComment = ()=>{
    this.makeComment = {
      issueId:this.issueId,
      description:this.comment
    }

    this.appService.addComment(this.makeComment).subscribe(
      (response)=>{
        this.toastr.successToastr(response['message'])
        this.getComment()
        this.comment=''
      }
    )
  }

}
