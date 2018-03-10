import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService } from '../services/rest.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
    selector: 'app-manage-events',
    templateUrl: './manage-events.component.html',
    styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent implements OnInit {

    itemsCount: number; // default amount of shown pairs of events
    sortOptions = [
        { id: 0, name: 'probability of equality' },
        { id: 1, name: 'number of equality suggestions' },
        { id: 2, name: 'number of first is subevent suggestions' },
        { id: 3, name: 'number of second is subevent suggestions' }
    ];

    constructor(private router: Router, private restService: RestService, private sharedDataService: SharedDataService) { }

    ngOnInit() {
        if (!this.sharedDataService.isAdmin)
            this.router.navigate(['/home']);

        this.sharedDataService.loader = true;
        this.sharedDataService.similarEvents = [];
        this.sharedDataService.similarEventsAll = [];
        this.restService.getUnsolvedSimilarities().subscribe(
            data => {
                this.sharedDataService.similarEventsAll = data;

                this.itemsCount = data.length >= 10 ? 10 : data.length;

                this.sharedDataService.similarEvents = this.sharedDataService.similarEventsAll.slice(0, this.itemsCount);
                this.sharedDataService.similarEventsAll.splice(0, this.itemsCount);

                this.sharedDataService.loader = false;
            },
            err => {
                this.sharedDataService.confirmationMessage = { message: 'An error encountered while loading data from server! Please try again.', error: true };
                this.sharedDataService.loader = false;
            }
        );
    }

    sortBy(option): void {
        if (option >= 0)
            switch (option) {
                case 0:
                    this.sharedDataService.similarEventsAll.sort(function (a, b) {
                        return b.probabilityOfEquality - a.probabilityOfEquality;
                    });
                    this.sharedDataService.similarEvents = this.sharedDataService.similarEventsAll.slice(0, 20);
                    break;
                case 1:
                    this.sharedDataService.similarEventsAll.sort(function (a, b) {
                        return b.equalitySuggestions.length - a.equalitySuggestions.length;
                    });
                    this.sharedDataService.similarEvents = this.sharedDataService.similarEventsAll.slice(0, 20);
                    break;
                case 2:
                    this.sharedDataService.similarEventsAll.sort(function (a, b) {
                        return b.firstIsSubeventSuggestions.length - a.firstIsSubeventSuggestions.length;
                    });
                    this.sharedDataService.similarEvents = this.sharedDataService.similarEventsAll.slice(0, 20);
                    break;
                case 3:
                    this.sharedDataService.similarEventsAll.sort(function (a, b) {
                        return b.secondIsSubeventSuggestions.length - a.secondIsSubeventSuggestions.length;
                    });
                    this.sharedDataService.similarEvents = this.sharedDataService.similarEventsAll.slice(0, 20);
                    break;
                case -1: // this is default(empty) option
                default: // do nothing
            }
    }

    // to dynamically add more pairs of events from similarEventsAll array into similarEvents array
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if (window.innerHeight + window.scrollY === document.documentElement.scrollHeight && this.sharedDataService.similarEventsAll.length > 0) {
            this.sharedDataService.similarEvents = this.sharedDataService.similarEvents.concat(this.sharedDataService.similarEventsAll.slice(0, this.itemsCount));
            this.sharedDataService.similarEventsAll.splice(0, this.itemsCount);
        }
    }

}
