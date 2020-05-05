import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
//routing
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard.module';
import { LoginComponent } from './user/login/login.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';

//import { FontAwesomeModule } from '@fortawesome/fontawesome-free'


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UserModule,
    FormsModule,
    DashboardModule,
    HttpClientModule,
    NgxEditorModule,
   // FontAwesomeModule,
    //fontawesome,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '*', component: LoginComponent },
      { path: '**', component: LoginComponent }

    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
