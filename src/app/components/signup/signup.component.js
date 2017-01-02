"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var signup_service_1 = require("../../services/signup.service");
var SignupComponent = (function () {
    function SignupComponent(signupService) {
        var _this = this;
        this.signupService = signupService;
        this.signupService.getUsers().subscribe(function (users) {
            _this.users = users;
            console.log(users);
        });
    }
    SignupComponent.prototype.addUser = function (event) {
        var _this = this;
        event.preventDefault();
        //when posting the keys of an object need to be exact name as in db
        var newUser = {
            firstName: this.fName,
            lastName: this.lName,
            email: this.email,
            userName: this.uName,
            password: this.password
        };
        this.signupService.addUser(newUser)
            .subscribe(function (user) {
            _this.users.push(user);
            _this.fName = '';
            _this.lName = '';
            _this.email = '';
            _this.uName = '';
            _this.password = '';
        });
    };
    SignupComponent.prototype.deleteUser = function (id) {
        var users = this.users;
        this.signupService.deleteUser(id).subscribe(function (data) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == id) {
                    users.splice(i, 1);
                }
            }
        });
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'signup',
        templateUrl: 'signup.component.html'
    }),
    __metadata("design:paramtypes", [signup_service_1.SignupService])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map