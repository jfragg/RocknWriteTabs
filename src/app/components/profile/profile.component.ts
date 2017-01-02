import { Component } from '@angular/core';
import {HomeService} from '../../services/home.service';
import {MainService} from '../../services/main.service';
import {EditService} from '../../services/edit.service';
import {Tab} from '../../Tabs';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent {

  tabs: Tab [];
  user: string;

  constructor(private homeService: HomeService, private mainService: MainService, private editService: EditService) {
    this.homeService.getTabs().subscribe(tabs => {

      this.tabs = tabs;
      this.user = this.mainService.getCookie();

      var usersTabs = [];

      for(let i = 0; i < this.tabs.length; i++){

        if(this.tabs[i].author === (this.user)) {

          let date = this.mainService.formatDate(this.tabs[i].revisionDate);
          let version = this.tabs[i].versionNumber / 10;

          this.tabs[i].revisionDate = date;
          this.tabs[i].versionNumber = version;

          usersTabs.push(this.tabs[i]);
        }
      }

      this.tabs = usersTabs;

    });

  }

  removeTab(id){
      this.editService.deleteTab(id).subscribe(data => {

        for(var i = 0; i < this.tabs.length; i++){
          if(this.tabs[i]._id === id) {
            this.tabs.splice(i,1);
          }
        }

      });
  }

};
