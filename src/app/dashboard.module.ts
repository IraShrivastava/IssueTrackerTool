import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { IssueViewComponent } from './dashboard//issue-view/issue-view.component';
import { SearchViewComponent } from './dashboard/search-view/search-view.component';
import { IssueCreateComponent } from './dashboard//issue-create/issue-create.component';
import { IssueEditComponent } from './dashboard/issue-edit/issue-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FileUploadModule } from 'ng2-file-upload';
import { AuthGuardService } from './auth-guard.service';
//import { SharedModule} from './../shared/shared.module'
//import { UserDetailsComponent} from './../shared/user-details/user-details.component';
//import { RemoveSpecialCharPipe } from './../shared/pipe/remove-special-char.pipe';


@NgModule({
  declarations: [UserDashboardComponent, IssueViewComponent, SearchViewComponent, IssueCreateComponent, IssueEditComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    BrowserAnimationsModule,
    NgxEditorModule,
    FormsModule,
  //  SharedModule,
    TooltipModule.forRoot(),
    RouterModule.forChild([
      {path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuardService]},
      {path: 'issue-create', component: IssueCreateComponent, canActivate: [AuthGuardService]},
      {path: 'issue-view/:issueId', component: IssueViewComponent, canActivate: [AuthGuardService]},
      {path: 'issue-edit/:issueId', component: IssueEditComponent, canActivate: [AuthGuardService]}
    ])
  ],
  providers: [AuthGuardService]
})
export class DashboardModule { }
