import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class MainService{

  setCookie(cvalue, loggedIn){
      document.cookie = "username=" + cvalue;
      document.cookie = "loggedIn=" + loggedIn;
  }

  getCookieName(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i++){
      var c = ca[i];
      while( c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if(c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }

    }
  }

  getCookie(){
    var x = document.cookie.split(';');

    for(var i = 0; i < x.length; i++){
      if(x[i].split('=')[0].trim() == 'username') {
         return x[i].split('=')[1];
      }
    }
  }

  getLoggedIn(){
    var x = document.cookie.split(';');

    for(var i = 0; i < x.length; i++){
      if(x[i].split('=')[0].trim() == 'loggedIn') {
         return x[i].split('=')[1];
      }
    }
  }

  checkCookieName(): any {
      var user = this.getCookieName("username");
      if(user != "" || user === null){
          console.log('not logged in');
      } else {
        return user;
      }
  }


  formatDate(date){
    var x = date.split('T');
    return x[0];
  }

}
