import { Component } from '@angular/core';
import {EditService} from '../../services/edit.service';
import {HomeService} from '../../services/home.service';
import { ActivatedRoute } from '@angular/router';
import {MainService} from '../../services/main.service';
import {Tab} from '../../Tabs';

@Component({
  selector: 'tab-edit',
  templateUrl: 'tab-edit.component.html'
})

export class TabEditComponent {

  tabs: Tab[];

  title: string;
  artist: string;
  chordEdit: string;
  privacy: string;
  versionNumber: Number;
  tempLyrics: string;
  name: string;

  constructor(private editService: EditService, private homeService: HomeService, private route: ActivatedRoute, private mainService: MainService) {

    const id = this.route.snapshot.params['id'];

    this.editService.getTabs().subscribe(tabs => {
      this.tabs = tabs;
    });

    this.homeService.getTab(id).subscribe(data => {
      this.title = data.title;
      this.artist = data.artist;
      this.chordEdit = data.lyrics;
      this.versionNumber = data.versionNumber;
      this.tempLyrics = data.lyrics;
      this.name = data.name;
    });
  }

  addTab(event){
    event.preventDefault();

    this.title = this.editService.errorCheck(this.chordEdit);

    //when posting the keys of an object need to be exact name as in db
    if(this.title != '' && this.artist != '' && this.chordEdit != '' && this.name != ''){

      var isPrivate;

      if(this.privacy === 'Private') isPrivate = true;
      else if (this.privacy === 'Public') isPrivate = false;
      else isPrivate = false;

      var d = new Date();
      var version;

      //only when the main body of the chord sheet is changed do we update the version number
      if(this.tempLyrics === this.chordEdit) {
        version = this.versionNumber;
      } else {
        version = this.versionNumber + 1;
      }

      var newTab = {
        title: this.title,
        name: this.name,
        lyrics: this.chordEdit,
        artist: this.artist,
        author: this.mainService.getCookie(),
        privacy: isPrivate,
        revisionDate: d.toJSON(),
        versionNumber: version
      };

      this.editService.updateTab(newTab, this.route.snapshot.params['id'])
        .subscribe(tab => {
          this.tabs.push(tab);
          this.name = '';
          this.chordEdit = '';
          this.artist = '';
        });
    }
  }

  confirmClear(){
    var result = confirm("Are you sure you want to clear the textarea?");
    if(result){
      this.chordEdit = '';
      this.artist = '';
      this.name = '';
    }
  }

};
