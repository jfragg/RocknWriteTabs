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
//let chordpro = require('chordprojs');
//let _ = require('lodash');
var EditService = (function () {
    function EditService(http) {
        this.http = http;
        console.log('Edit Service is Initialized...');
    }
    EditService.prototype.getTabs = function () {
        return this.http.get('http://localhost:8080/tabs')
            .map(function (res) { return res.json(); });
    };
    EditService.prototype.addTab = function (newTab) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/tabs', JSON.stringify(newTab), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    EditService.prototype.deleteTab = function (id) {
        return this.http.delete('http://localhost:8080/tabs/' + id)
            .map(function (res) { return res.json(); });
    };
    return EditService;
}());
EditService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EditService);
exports.EditService = EditService;
//# sourceMappingURL=edit.service.js.map