import { Component } from '@angular/core';
import {SignupService} from './services/signup.service';
import {AuthenticationService} from './services/authentication.service';
import {EditService} from './services/edit.service';
import {HomeService} from './services/home.service';
import {MainService} from './services/main.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SignupService, AuthenticationService, EditService, HomeService, MainService]
})
export class AppComponent {

  signedIn: boolean = false;

  constructor(private mainService: MainService, private router: Router) {
    this.router.events.subscribe(path => {
      if (this.mainService.getLoggedIn() === "true") {
       this.signedIn = true;
       } else if(this.mainService.getLoggedIn() === "false"){
       this.signedIn = false;
       }
    });

  }
}
