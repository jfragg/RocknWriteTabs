import { Component } from '@angular/core';
import {MainService } from '../../../services/main.service';

@Component({
  selector: 'dmcatakedown',
  templateUrl: 'dmcatakedown.component.html'
})
export class TakedownComponent {

  constructor(private mainService: MainService) {

  }

}

