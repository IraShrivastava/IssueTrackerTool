import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { FileUploader } from 'ng2-file-upload';
import { ToastrManager } from 'ng6-toastr-notifications';
import {NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
//import { FontAwesomeModule } from '@fortawesome/fontawesome-free'

const uri = 'api/upload'

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent implements OnInit {

  uploader : FileUploader = new FileUploader({url:uri})
  

  public attachmentList :any = []
  constructor(private toastr: ToastrManager, public appService: AppService, public router: Router) { 

    this.allRetrivedUsers()
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any)=>{
      this.attachmentList.push(JSON.parse(response))
      console.log(this.attachmentList)

  }
}

  public issueTitle: string
  public allUsers = []
  public fileId = []
  public assignedToId: string
  public assignedTo: string
  public description: string
  public allStatus = ["Backlog", "In-Progress", "In-Test", "Done"]
  public issue: any
  public issueStatus: string
  public trial: any;
  public trial1:any;

  ngOnInit(): void {
  }

  public allRetrivedUsers = () => {
    let allUsers = []
    this.appService.allRegisterUsers()
      .subscribe((apiResponse) => {
        for (let x of apiResponse.data) {
        //  console.log('data '+apiResponse.data)
          allUsers.push(x)
        //  console.log('alluser '+allUsers)
        }
      })
      //console.log(allUsers)
    this.appService.allSocialUsers()
      .subscribe((apiResponse) => {
        if(apiResponse.status==200)
        {
          for (let y of apiResponse.data) 
          {
          allUsers.push(y)  
          }
        }
      })

    this.allUsers = allUsers

  }

  public createIssue = () => {
    for (let x of this.allUsers) {
      if (x.userId === this.assignedToId) {
        var name = x.firstName + " " + x.lastName
      }
    }

    for(let y of this.attachmentList){
      console.log(y.file.id)
      this.fileId.push(y.file.id)
    } 

    this.assignedTo = name
    console.log(this.fileId)
    let reporter = Cookie.get('UserName')
    let reporterId = Cookie.get('userId');

  
    console.log('description'+this.description)
    this.issue = {
      status: this.issueStatus,
      title: this.issueTitle,
      description: this.description,
      assignedTo: this.assignedTo,
      assignedToId: this.assignedToId,
      reporter: reporter,
      reporterId: reporterId,
      images: this.fileId,
      createdOn: new Date()
    }
    //console.log(this.description);
    //console.log(this.issue.description.content[0].content[0].text);
    
    this.appService.createIssue(this.issue).subscribe(
      (response) => {
        if (response['status'] == 200) {
          this.toastr.successToastr('New Issue Created');
          console.log(response);
          setTimeout(() => {
            this.router.navigate(['/dashboard'])
          }, 2000)
        }
      }
    )
  }

}
