import {Injectable} from '@angular/core';
import {Curly} from '../Curly';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EditService{
    constructor(private http:Http){
        console.log('Edit Service is Initialized...');
    }

    getTabs(){
        return this.http.get('http://localhost:8080/tabs')
            .map((res:Response) => res.json());
    }

    addTab(newTab){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/tabs', JSON.stringify(newTab), {headers: headers})
            .map(res => res.json());
    }

    updateTab(tab, id) {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put('http://localhost:8080/tabs/' + id, JSON.stringify(tab), {headers: headers})
        .map(res => res.json());
    }

    deleteTab(id){
        return this.http.delete('http://localhost:8080/tabs/' + id)
            .map(res=>res.json());
    }

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

  //if there is an error in the check set the title name to '' and return that
  errorCheck(lyrics){
    let meta = this.formatTextForChecks(lyrics);

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

    let titleNameCheck = "placeholder";

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
              this.lowercaseDefineWarning(valueofdata.charAt(0));

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
                titleNameCheck = '';
                break;
              case "subtitle":
                this.checkMissingColon(directive.trim());
                titleNameCheck = '';
                break;
              case "comment":
                this.checkMissingColon(directive.trim());
                titleNameCheck = '';
                break;
              case "define":
                this.checkMissingColon(directive.trim());
                titleNameCheck = '';
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

    if(this.checkOpenCurly(openCurliesFound)) {
      titleNameCheck = '';
    }
    if( this.checkClosedCurly(closeCurliesFound)) {
      titleNameCheck = '';
    }
    if(this.checkTitleBeforeLyrics(title.location, lyrics.location)){
      titleNameCheck = '';
    }
    if(this.checkForMultipleTitles(title.count)) {
      titleNameCheck = '';
    }

    if(titleNameCheck === "placeholder") {
      return title.name;
    } else {
      return titleNameCheck;
    }

  }


  //ERRORS

  checkOpenCurly(array) {
    for(let i = 0; i < array.length; i++) {
      if(array[i].location != 0) {
        alert('ERROR! Open Curly Bracket at pos: ' + array[i].location);
        return true;
      }
    }

    return false;
  }

  checkClosedCurly(array) {
    for(let i = 0; i < array.length; i++) {
      if(!array[i].isLast) {
        alert('ERROR! Closed Curly Bracket at pos: ' + array[i].location);
        return true;
      }
    }

    return false;
  }

  checkTitleBeforeLyrics(t_Location, l_Location) {
    if((t_Location > l_Location) || t_Location === null || l_Location === null) {
      alert('ERROR! Lyrics are displayed before the title or no title is found');
      return true;
    }
    return false;
  }

  checkForMultipleTitles(t_count){
    if(t_count > 1){
      alert('ERROR! There are ' + (t_count - 1) + ' too many title directives');
      return true;
    }
    return false;
  }

  checkMissingColon(directive_name){
    alert('ERROR! The directive "' + directive_name + '" is missing a colon');
  }

  //WARNINGS
  lowercaseDefineWarning(character){
    confirm('WARNING! The character ' + character + ' is lowercase in your name parameter for Define directive');
  }

  defineCodeWarning(string){
    confirm(string);
  }
}
