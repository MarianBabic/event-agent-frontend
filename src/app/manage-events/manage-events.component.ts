import { Component, OnInit } from '@angular/core';

import { RestService } from '../services/rest.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
    selector: 'app-manage-events',
    templateUrl: './manage-events.component.html',
    styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit {

    similarEvents: any[];
    similarEventsAll: any[];
    similarEventsCount: number = 0;
    similarEventsCountAll: number = 0;
    sortOptions = [
        { id: 0, name: 'probability of equality' },
        { id: 1, name: 'number of equality suggestions' },
        { id: 2, name: 'number of first is subevent suggestions' },
        { id: 3, name: 'number of second is subevent suggestions' }
    ];

    constructor(private restService: RestService, private sharedDataService: SharedDataService) { }

    ngOnInit() {
        this.restService.getUnsolvedSimilarities().subscribe(
            data => {
                console.log(data);
                this.similarEvents = data.slice(0, 20);
                this.similarEventsAll = data;
                this.similarEventsCount = this.similarEvents.length;
                this.similarEventsCountAll = data.length;
            },
            err => this.sharedDataService.confirmationMessage = {
                message: 'An error encountered while loading data from server! Please try again.',
                error: true
            }
        );
    }

    sortBy(option): void {
        if (option >= 0)
            switch (option) {
                case 0:
                    this.similarEventsAll.sort(function (a, b) {
                        return b.probabilityOfEquality - a.probabilityOfEquality;
                    });
                    this.similarEvents = this.similarEventsAll.slice(0, 20);
                    break;
                case 1:
                    this.similarEventsAll.sort(function (a, b) {
                        return b.equalitySuggestions.length - a.equalitySuggestions.length;
                    });
                    this.similarEvents = this.similarEventsAll.slice(0, 20);
                    break;
                case 2:
                    this.similarEventsAll.sort(function (a, b) {
                        return b.firstIsSubeventSuggestions.length - a.firstIsSubeventSuggestions.length;
                    });
                    this.similarEvents = this.similarEventsAll.slice(0, 20);
                    break;
                case 3:
                    this.similarEventsAll.sort(function (a, b) {
                        return b.secondIsSubeventSuggestions.length - a.secondIsSubeventSuggestions.length;
                    });
                    this.similarEvents = this.similarEventsAll.slice(0, 20);
                    break;
                case -1: // this is default(empty) option
                default: // do nothing
            }
    }

}
