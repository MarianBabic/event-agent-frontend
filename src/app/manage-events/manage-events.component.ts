import { Component, OnInit } from '@angular/core';

import { RestService } from '../services/rest.service';

@Component({
    selector: 'app-manage-events',
    templateUrl: './manage-events.component.html',
    styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit {

    similarEvents: any[];

    constructor(private restService: RestService) { }

    ngOnInit() {
        this.restService.getUnsolvedSimilarities().subscribe(
            data => {
                console.log(data);
                this.similarEvents = data.slice(0, 10); // TODO: = data
            },
            err => {
                alert('An error encountered while loading data from server! Please try again.');
            }
        );
    }

}
