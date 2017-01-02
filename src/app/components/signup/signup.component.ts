import { Component } from '@angular/core';
import {SignupService} from '../../services/signup.service';
import {User} from '../../Users';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html'
})
export class SignupComponent {
  users: User[];

  fName: string = '';
  lName: string = '';
  email: string = '';
  uName: string = '';
  password: string = '';
  confpassword: string = '';

  invalid: boolean = false;
  incomplete: boolean = false;
  dontmatch: boolean = false;

  constructor(private signupService: SignupService) {
    this.signupService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  validateUserInfo(username, email){
      this.invalid = false;
      for(let i = 0; i < this.users.length; i++){
        if(username === this.users[i].userName || email === this.users[i].email) {
          this.invalid = true;
          this.uName = '';
          this.email = '';
        }
      }
  }

  validatePasswords(){
    if(this.password != this.confpassword){
      this.dontmatch = true;
      this.password = '';
      this.confpassword = '';
    } else {
      this.dontmatch = false;
    }
  }

  validateFieldsFilled(){
      this.incomplete = false;

      if(this.email === '')
      {
        this.incomplete = true;
      }
      if (this.uName === ''){
        this.incomplete = true;
      }
      if (this.password === '') {
        this.incomplete = true;
      }
      if(this.lName === '') {
        this.incomplete = true;
      }
      if(this.fName === '') {
        this.incomplete = true;
      }
  }


  addUser(event){
    event.preventDefault();
    //when posting the keys of an object need to be exact name as in db
    this.validateFieldsFilled();
    this.validateUserInfo(this.uName, this.email);
    this.validatePasswords();

    if((this.invalid === false) && (this.incomplete === false) && (this.dontmatch === false)){
      var newUser = {
        firstName: this.fName,
        lastName: this.lName,
        email: this.email,
        userName: this.uName,
        password: this.password
      };

      this.signupService.addUser(newUser)
        .subscribe(user => {
          this.users.push(user);
          this.clearFields();
        });
    } else {

    }

  }

  clearFields(){
    this.fName = '';
    this.lName = '';
    this.email = '';
    this.uName = '';
    this.password = '';
    this.confpassword = '';
  }

  closeInvalid() {
    this.invalid = false;
  }

  closeIncomplete() {
    this.incomplete = false;
  }

  closeDontmatch() {
    this.dontmatch = false;
  }


 }
