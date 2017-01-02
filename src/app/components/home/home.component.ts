import { Component } from '@angular/core';
import {HomeService} from '../../services/home.service';
import {MainService} from '../../services/main.service';
import {Tab} from '../../Tabs';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {

    tabs: Tab [];

    constructor(private homeService: HomeService, private mainService: MainService) {

        this.homeService.getTabs().subscribe(tabs => {

            this.tabs = tabs;

            var publicTabs = [];

            for(let i = 0; i < this.tabs.length; i++){
                if(!(tabs[i].privacy)) {
                    let date = this.mainService.formatDate(this.tabs[i].revisionDate);
                    let version = this.tabs[i].versionNumber / 10;

                    this.tabs[i].revisionDate = date;
                    this.tabs[i].versionNumber = version;
                    publicTabs.push(this.tabs[i]);
                }
            }
            this.tabs = publicTabs;
        });
    }
 }

