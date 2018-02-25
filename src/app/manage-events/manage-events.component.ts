import { Component, OnInit } from '@angular/core';

import { RestService } from '../services/rest.service';

@Component({
    selector: 'app-manage-events',
    templateUrl: './manage-events.component.html',
    styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit {

    similarEvents: any[];
    similarEventsCount: number = 0;
    sortOptions = [
        { id: 0, name: 'probability of equality' },
        { id: 1, name: 'number of equality suggestions' },
        { id: 2, name: 'number of first is subevent suggestions' },
        { id: 3, name: 'number of second is subevent suggestions' }
    ];

    constructor(private restService: RestService) { }

    ngOnInit() {
        this.restService.getUnsolvedSimilarities().subscribe(
            data => {
                console.log(data);
                // this.similarEvents = data.slice(0, 10); // TODO: = data
                let arr = [];
                data.forEach(element => {
                    if (element.equalitySuggestions.length > 1 || element.firstIsSubeventSuggestions.length > 1 || element.secondIsSubeventSuggestions.length > 1)
                        arr.push(element);
                });
                this.similarEvents = arr;
                this.similarEventsCount = this.similarEvents.length;
            },
            err => {
                alert('An error encountered while loading data from server! Please try again.');
            }
        );
    }

    sortBy(option): void {
        if (option >= 0)
            switch (option) {
                case 0:
                    this.similarEvents.sort(function (a, b) {
                        return b.probabilityOfEquality - a.probabilityOfEquality;
                    });
                    break;
                case 1:
                    this.similarEvents.sort(function (a, b) {
                        return b.equalitySuggestions.length - a.equalitySuggestions.length;
                    });
                    break;
                case 2:
                    this.similarEvents.sort(function (a, b) {
                        return b.firstIsSubeventSuggestions.length - a.firstIsSubeventSuggestions.length;
                    });
                    break;
                case 3:
                    this.similarEvents.sort(function (a, b) {
                        return b.secondIsSubeventSuggestions.length - a.secondIsSubeventSuggestions.length;
                    });
                    break;
                case -1: // this is default(empty) option
                default: // do nothing
            }
    }

}
