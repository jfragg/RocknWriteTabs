import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HomeService} from '../../services/home.service';
import {Tab} from '../../Tabs';

var chordpro = require('chordprojs');

@Component({
    selector: 'tab',
    templateUrl: 'tab.component.html'
})

export class TabComponent{

    tabs: Tab[];
    lyrics: string;
    title: string;
    name: string;
    artist: string;
    author: string;
    version: number;
    date: string;

    constructor(private homeService: HomeService, private route: ActivatedRoute){

        this.homeService.getTabs().subscribe(tabs => {
            this.tabs = tabs;
            console.log(tabs);
        });

        const id = route.snapshot.params['id'];
        console.log(id);

        this.homeService.getTab(id).subscribe(data => {
            this.title = data.title;
            this.artist = data.artist;
            this.name = data.name;

            let parsedResult = chordpro.parse(data.lyrics);
            let formatResult = chordpro.formatParseResult(parsedResult);

            this.lyrics = formatResult.html;
            this.author = data.author;
            this.date = data.revisionDate;
            this.version = data.versionNumber / 10;

        });

    }

    openNav() {
        document.getElementById("ol").style.width = "100%";
    }

    /* Close when someone clicks on the "x" symbol inside the overlay */
    closeNav() {
        document.getElementById("ol").style.width = "0%";
    }

};
