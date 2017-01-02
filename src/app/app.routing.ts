import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

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

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: 'tabs/:id',
    component: TabComponent
  },
  {
    path: 'dmca',
    component: DMCAComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'tab-edit/:id',
    component: TabEditComponent
  },
  {
    path: 'takedown',
    component: TakedownComponent
  },
  {
    path: 'security',
    component: SecurityComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
