import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {MainService} from '../../services/main.service';

import {User} from '../../Users';

@Component({
  selector: 'logout',
  templateUrl: 'logout.component.html'
})
export class LogoutComponent{

  constructor(private router: Router, private mainService: MainService ){
      this.mainService.setCookie(" ", "false");
      this.router.navigate(['/login']);
  }
}
