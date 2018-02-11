import { Component, OnInit } from '@angular/core';

import { DummyDataService } from '../services/dummy-data.service';
import { SharedDataService } from '../services/shared-data.service';

var eventDetailModal: HTMLElement;

@Component({
    selector: 'app-view-events',
    templateUrl: './view-events.component.html',
    styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {

    // TODO
    events: any = [];
    isCheckingActive: boolean = false;
    checkedEvents: Set<number> = new Set();
    checkedCheckbox: boolean = false;

    clickedEvent: any;

    constructor(public dummyDataService: DummyDataService, private sharedDataService: SharedDataService) { }

    // TODO
    ngOnInit() {
        this.events = this.dummyDataService.dummyEvents;
        // this.http.get(this.host + 'events').subscribe(
        //     data => {
        //         this.events = this.dummyDataService.dummyEvents = data;
        //     },
        //     err => {
        //         alert('No data from server were loaded!');
        //     });

        // get the event detail modal
        eventDetailModal = document.getElementById('eventDetailModal');

        // when the user clicks anywhere outside of the event detail modal, close it
        window.onclick = function (event) {
            if (event.target == eventDetailModal) {
                eventDetailModal.style.display = "none";
            }
        }
    }

    openEventDetailModal(event: any): void {
        this.clickedEvent = event;
        eventDetailModal.style.display = 'block';
    }

    getCurrentDate(): Date {
        return new Date();
    }

    getDatePlusWeek(): Date {
        var d = new Date();
        d.setDate(d.getDate() + 7);
        return d;
    }

    // TODO
    filterEvents(text: string): void {
        text = text.toUpperCase();
        this.events = this.dummyDataService.dummyEvents;
        if (text.length !== 0) {
            this.events = this.events.filter(event =>
                event.name.toUpperCase().includes(text)
                || event.description.toUpperCase().includes(text)
                || event.place.name.toUpperCase().includes(text)
            );
        }
    }

    // TODO
    showCheckedEvents(): void {
        this.checkedCheckbox = !this.checkedCheckbox;
        if (this.checkedCheckbox) {
            this.events = this.events.filter(
                event => this.checkedEvents.has(event.id)
            );
        } else {
            this.events = this.dummyDataService.dummyEvents;
        }
    }

    // TODO
    submitCheckedEvents(): void {
        this.sharedDataService.openSubmitModal();
        this.sharedDataService.submitModal.events = this.checkedEvents;
    }

    // TODO
    toggleCheckedEvent(id: number): void {
        this.checkedEvents.has(id) ? this.checkedEvents.delete(id) : this.checkedEvents.add(id);
    }

    // TODO
    autoCompleteCallback(event: any): void {
        console.log(event);
    }

}
