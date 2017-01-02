import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {MainService} from '../../services/main.service';

import {User} from '../../Users';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent{
    users: User[];

    uName: string;
    password: string;
    wrongpass: boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private mainService: MainService)
    {
            this.authenticationService.getUsers().subscribe(users => {
                this.users = users;
            });
    }

    login() {
        var users = this.users;

        for(let i = 0; i < users.length; i++){

          //decrypt password
          let decPass = atob(users[i].password);

          if(users[i].userName == this.uName && atob(decPass) == this.password){
              console.log("User logged in!");

              //document.cookie = users[i].userName;
              this.mainService.setCookie(users[i].userName, "true");
              console.log(document.cookie);
              this.router.navigate(['/home']);
          }
        }

        this.wrongpass = true;
    }

}
