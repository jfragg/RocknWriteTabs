import { Component } from '@angular/core';
import {EditService} from '../../services/edit.service';
import {MainService} from '../../services/main.service';
import {Tab} from '../../Tabs';
import {Curly} from '../../Curly';

@Component({
    selector: 'edit',
    templateUrl: 'edit.component.html'
})

export class EditComponent {

    tabs: Tab[];

    title: string = '';
    artist: string = '';
    chordEdit: string = '';
    privacy: string;

    //following variables were to be used for css style error msgs however ran out of time to make it look good :(
    /*
    openCurlyError: boolean = false;
    closeCurlyError: boolean = false;
    titlePlaceError: boolean = false;
    multipleTitlesError: boolean = false;
    missingColonError: boolean = false;

    openCurlyMsg: string;
    closeCurlyMsg: string;
    */

    constructor(private editService: EditService, private mainService: MainService) {

        this.editService.getTabs().subscribe(tabs => {
            this.tabs = tabs;
        });
    }

    addTab(event){
        event.preventDefault();

        var isPrivate;

        if(this.privacy === 'Private') isPrivate = true;
        else if (this.privacy === 'Public') isPrivate = false;
        else isPrivate = false;

        var d = new Date();

        //this.errorCheck();
        this.title = this.editService.errorCheck(this.chordEdit);
        let displayName = this.title;

      //when posting the keys of an object need to be exact name as in db
        if(this.title != '' && this.artist != '' && this.chordEdit != ''){

          var newTab = {
            title: this.title,
            name: displayName,
            lyrics: this.chordEdit,
            artist: this.artist,
            author: this.mainService.getCookie(),
            privacy: isPrivate,
            revisionDate: d.toJSON(),
            versionNumber: 10
          };

          this.editService.addTab(newTab)
            .subscribe(tab => {
              this.tabs.push(tab);
              this.title = '';
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
            this.title = '';
        }
    }

    errorCheck(){
      this.title = this.editService.errorCheck(this.chordEdit);
    }


    /*

    formatTextForChecks(text){
        let meta = text.split(/(})/);

        for(let i = 0; i < meta.length; i += 2) {
          if(i + 1 < meta.length)
            meta[i] = (meta[i] + meta[i + 1]).trim();
          else
            meta[i] = meta[i].trim();
        }

        for(let i = 0; i < meta.length; i++) {
          if(meta[i] === '}') {
            meta.splice(i, 1);
          }
        }

        return meta;
    }

    errorCheck(){
        let meta = this.formatTextForChecks(this.chordEdit);

        var openCurly = new Curly();
        var closeCurly = new Curly();

        var openCurliesFound = [];
        var closeCurliesFound = [];

        let lyrics = {
          body: '',
          location: null
        };

        let title = {
          name: '',
          location: null,
          count: 0
        };

        for(let i = 0; i < meta.length; i++) {

            //if the first element of the string is not an opening tag it must be the lyrics of the song
            if(meta[i].charAt(0) != '{')  {
                lyrics.body = meta[i];
                lyrics.location = i;
            }

            for(let j = 0; j < meta[i].length; j++) {

                if(meta[i].charAt(j) === '{') {

                  //get the meta
                  let metadata = meta[i].split(':');
                  console.log(metadata);

                  if(metadata[0] != null && metadata[1] != null){
                    let typeofdata = metadata[0].replace('{', '');
                    let valueofdata = metadata[1].replace('}', '');

                    if(typeofdata.trim() === "title") {
                      title.name = valueofdata;
                      title.location = i;
                      title.count++;
                    }

                    valueofdata = valueofdata.trim();
                    let charInQuestion = valueofdata.charAt(0).toLowerCase();

                    if(typeofdata.trim() === "define" && valueofdata.charAt(0) === charInQuestion) {
                        this.lowercaseDefine(valueofdata.charAt(0));

                    } else if (typeofdata.trim() === "define") {
                        let tmp = valueofdata;
                        let defineCodes = tmp.replace(' ', '|');
                        defineCodes = defineCodes.split('|');

                        if(defineCodes[1].trim().length != 6) {
                          this.defineCodeWarning('Warning! Code definition is not 6 characters');
                        } else if (defineCodes[1].length === 6) {
                          console.log(defineCodes[1]);
                          for(let n = 0; n < 6; n++){
                            if(defineCodes[1].charAt(n).toLowerCase() === 'x') {
                              console.log("x is fine");
                            } else if ( !(/\d/.test(defineCodes[1].charAt(n))) ) {
                              this.defineCodeWarning("Warning! n = " + n + " value = " + defineCodes[1].charAt(n));
                            }
                          }
                        }
                    }

                    //the directive would not be split by ':' if there is none so it will be the same as the meta value
                  } else if(metadata[0] != null && metadata[0] === meta[i]){
                    let directive = metadata[0];
                    directive = directive.replace('{', '');
                    directive = directive.replace('}', '');
                    directive = directive.replace(' ', '|');

                    let dirArray = directive.split('|');
                    directive = dirArray[0].trim();

                    switch(directive.trim()) {
                      case "title":
                        this.checkMissingColon(directive.trim());
                        break;
                      case "subtitle":
                        this.checkMissingColon(directive.trim());
                        break;
                      case "comment":
                        this.checkMissingColon(directive.trim());
                        break;
                      case "define":
                        this.checkMissingColon(directive.trim());
                        break;
                      default:
                        console.log(directive.trim());
                    }

                  }

                  openCurly.found = true;
                  openCurly.location = j;
                  openCurliesFound.push(openCurly);

                  openCurly = new Curly();
                }

                //if a '}' is found then check if it is the last element by seeing if it had an opening tag to start
                //if it has no opening tag at the start it must be in the middle of the body
                if(meta[i].charAt(j) === '}') {
                  closeCurly.found = true;
                  closeCurly.location = j;

                  if(meta[i].charAt(0) === '{')  {
                    closeCurly.isLast = true;
                  }
                  else closeCurly.isLast = false;

                  closeCurliesFound.push(closeCurly);
                  closeCurly = new Curly();
                }
            }
        }

        this.checkOpenCurly(openCurliesFound);
        this.checkClosedCurly(closeCurliesFound);
        this.title = title.name;
        this.checkTitleBeforeLyrics(title.location, lyrics.location);
        this.checkForMultipleTitles(title.count);
    }


    //ERRORS

    checkOpenCurly(array) {
      for(let i = 0; i < array.length; i++) {
          if(array[i].location != 0) {
            alert('ERROR! Open Curly Bracket at pos: ' + array[i].location);
          }
      }
    }

    checkClosedCurly(array) {
      for(let i = 0; i < array.length; i++) {
        if(!array[i].isLast) {
          alert('ERROR! Closed Curly Bracket at pos: ' + array[i].location);
        }
      }
    }

    checkTitleBeforeLyrics(t_Location, l_Location) {
      if((t_Location > l_Location) || t_Location === null || l_Location === null) {
        confirm('ERROR! Lyrics are displayed before the title or no title is found');
      }
    }

    checkForMultipleTitles(t_count){
      if(t_count > 1){
        confirm('ERROR! There are ' + (t_count - 1) + ' too many title directives');
      }
    }

    checkMissingColon(directive_name){
      confirm('ERROR! The directive "' + directive_name + '" is missing a colon');
    }

    //WARNINGS
    lowercaseDefine(character){
      confirm('WARNING! The character ' + character + ' is lowercase in your name parameter for Define directive');
    }

    defineCodeWarning(string){
      confirm(string);
    }


    */

  /*closeOpenCurlyError(){
   this.openCurlyError = false;
   }

   closeClosedCurlyError(){
   this.closeCurlyError = false;
   }*/

};
