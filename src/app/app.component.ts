import { Component } from '@angular/core';

import { SharedDataService } from './services/shared-data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(public sharedDataService: SharedDataService) { }

}
