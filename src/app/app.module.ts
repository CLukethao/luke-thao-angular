import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from "./security/auth.guard";
import {AuthGuardLoggedIn} from "./security/auth.guard.loggedIn";
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { CommunityComponent } from './community/community.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardLoggedIn]},
  {path: 'signup', component: SignUpComponent, canActivate: [AuthGuardLoggedIn]},
  {path: 'community', component: CommunityComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    PostComponent,
    CommentComponent,
    CommunityComponent,
    ProfileComponent,
    MessagesComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [AuthGuard, AuthGuardLoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
