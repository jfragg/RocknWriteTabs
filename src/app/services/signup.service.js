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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var SignupService = (function () {
    function SignupService(http) {
        this.http = http;
        console.log('Task Service is Initialized...');
    }
    SignupService.prototype.getUsers = function () {
        return this.http.get('http://localhost:8080/users')
            .map(function (res) { return res.json(); });
    };
    SignupService.prototype.addUser = function (newUser) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/users', JSON.stringify(newUser), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    SignupService.prototype.deleteUser = function (id) {
        return this.http.delete('http://localhost:8080/users/' + id)
            .map(function (res) { return res.json(); });
    };
    return SignupService;
}());
SignupService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SignupService);
exports.SignupService = SignupService;
//# sourceMappingURL=signup.service.js.map