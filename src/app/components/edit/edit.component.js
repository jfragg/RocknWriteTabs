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
var edit_service_1 = require("../../services/edit.service");
var EditComponent = (function () {
    function EditComponent(editService) {
        var _this = this;
        this.editService = editService;
        this.editService.getTabs().subscribe(function (tabs) {
            _this.tabs = tabs;
            console.log(tabs);
        });
    }
    EditComponent.prototype.addTab = function (event) {
        var _this = this;
        event.preventDefault();
        //var parsedResult = chordpro.format(this.chordEdit);
        //console.log(parsedResult);
        //when posting the keys of an object need to be exact name as in db
        var newTab = {
            title: this.title,
            lyrics: this.chordEdit,
            artist: this.artist
        };
        this.editService.addTab(newTab)
            .subscribe(function (tab) {
            _this.tabs.push(tab);
            _this.title = '';
            _this.chordEdit = '';
            _this.artist = '';
        });
    };
    EditComponent.prototype.confirmClear = function () {
        var result = confirm("Are you sure you want to clear the textarea?");
        if (result) {
            console.log(this.chordEdit);
            this.chordEdit = '';
            this.artist = '';
            this.title = '';
        }
    };
    return EditComponent;
}());
EditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit',
        templateUrl: 'edit.component.html'
    }),
    __metadata("design:paramtypes", [edit_service_1.EditService])
], EditComponent);
exports.EditComponent = EditComponent;
;
//# sourceMappingURL=edit.component.js.map