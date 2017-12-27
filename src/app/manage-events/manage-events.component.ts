import { Component, OnInit } from '@angular/core';

import { DummyDataService } from '../services/dummy-data.service';

@Component({
    selector: 'app-manage-events',
    templateUrl: './manage-events.component.html',
    styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit {

    similarEvents: any[];

    constructor(private dummyDataService: DummyDataService) { }

    ngOnInit() {
        this.similarEvents = this.dummyDataService.dummySimilarEvents;
    }

}
