import { Component, OnInit } from '@angular/core';

import { DummyDataService } from '../services/dummy-data.service';
import { RestService } from '../services/rest.service';

@Component({
    selector: 'app-manage-events',
    templateUrl: './manage-events.component.html',
    styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit {

    similarEvents: any[];

    constructor(private dummyDataService: DummyDataService, private restService: RestService) { }

    ngOnInit() {
        this.similarEvents = this.dummyDataService.dummySimilarEvents;
        this.restService.getUnsolvedSimilarities().subscribe(
            data => {
                console.log(data);
            },
            err => {
                alert('An error encountered while loading data from server! Please try again.');
            }
        );
    }

}
