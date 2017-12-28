import { Component, OnInit } from '@angular/core';

import { DummyDataService } from '../services/dummy-data.service';

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

    constructor(public dummyDataService: DummyDataService) { }

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
        let entries: string = 'Events IDs:';
        this.checkedEvents.forEach(event => {
            entries += '\n' + event;
        });
        alert(entries);
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
