import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing, appRoutingProviders } from './app.routing';

import { AppComponent }   from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {EditComponent} from './components/edit/edit.component';
import {TabComponent} from './components/tabs/tab.component';
import {DMCAComponent} from './components/dmca/dmca.component';
import {LogoutComponent} from './components/logout/logout.component';
import {TabEditComponent} from './components/tab-edit/tab-edit.component';
import {TakedownComponent} from './components/dmca/takdown/dmcatakedown.component';
import {SecurityComponent} from './components/dmca/security/security.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, routing ],
  declarations: [ AppComponent, HomeComponent,
    ProfileComponent, SignupComponent,
    LoginComponent, EditComponent, TabComponent,
    DMCAComponent, LogoutComponent, TabEditComponent, TakedownComponent,
    SecurityComponent],
  bootstrap:    [ AppComponent ],
  providers: [
    appRoutingProviders
  ]
})
export class AppModule { }
