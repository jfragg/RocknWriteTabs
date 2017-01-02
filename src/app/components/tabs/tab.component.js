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
var router_1 = require("@angular/router");
var home_service_1 = require("../../services/home.service");
var TabComponent = (function () {
    function TabComponent(homeService, route) {
        var _this = this;
        this.homeService = homeService;
        this.route = route;
        this.homeService.getTabs().subscribe(function (tabs) {
            _this.tabs = tabs;
        });
        var id = route.snapshot.params['id'];
        console.log(id);
        this.homeService.getTab(id).subscribe(function (data) {
            _this.title = data.title;
            _this.artist = data.artist;
            _this.lyrics = data.lyrics.replace(/\n/g, "<br>");
        });
    }
    TabComponent.prototype.openNav = function () {
        document.getElementById("ol").style.width = "100%";
    };
    /* Close when someone clicks on the "x" symbol inside the overlay */
    TabComponent.prototype.closeNav = function () {
        document.getElementById("ol").style.width = "0%";
    };
    return TabComponent;
}());
TabComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tab',
        templateUrl: 'tab.component.html'
    }),
    __metadata("design:paramtypes", [home_service_1.HomeService, router_1.ActivatedRoute])
], TabComponent);
exports.TabComponent = TabComponent;
;
//# sourceMappingURL=tab.component.js.map