import { Component, OnInit } from '@angular/core';

import { SharedDataService } from '../services/shared-data.service';

declare var FB: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(public sharedDataService: SharedDataService) {
        FB.init({
            appId: '135544077099212',
            xfbml: true,  // parse social plugins on this page
            version: 'v2.10' // use graph api version 2.10
        });
    }

    ngOnInit() {
    }

    // FB uz je verzia 2.11
    /**
     * info o uzivatelovi: /me?fields=name
     */

}
