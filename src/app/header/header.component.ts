import { Component, OnInit } from '@angular/core';

import { SharedDataService } from '../services/shared-data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(public sharedDataService: SharedDataService) { }

    ngOnInit() {
    }

    // FB uz je verzia 2.11
    /**
     * info o uzivatelovi: /me?fields=name
     */

}
