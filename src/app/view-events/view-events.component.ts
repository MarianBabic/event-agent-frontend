import { Component, OnInit } from '@angular/core';

import { RestService } from '../services/rest.service';
import { SharedDataService } from '../services/shared-data.service';
import { getLocaleDateFormat } from '@angular/common';

var eventDetailModal: HTMLElement;

@Component({
    selector: 'app-view-events',
    templateUrl: './view-events.component.html',
    styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {

    // TODO
    events: any = [];
    filter = {
        latitude: null,
        longitude: null,
        range: 1000, // TODO: 10
        fromDate: new Date().toISOString() // TODO: timezone offset
    };
    filteredEventsCount: number;
    isCheckingActive: boolean = false;
    checkedEvents: Set<number> = new Set();
    googleMapsSettings: any = {
        // inputString: this.filter.latitude + ', ' + this.filter.longitude,
    }

    clickedEvent: any;

    constructor(private restService: RestService, private sharedDataService: SharedDataService) { }

    ngOnInit() {
        navigator.geolocation.getCurrentPosition(position => {
            this.filter.latitude = position.coords.latitude;
            this.filter.longitude = position.coords.longitude;
            if (this.filter.latitude && this.filter.longitude)
                this.getEvents();
        });

        // get the event detail modal
        eventDetailModal = document.getElementById('eventDetailModal');
        // when the user clicks anywhere outside of the event detail modal, close it
        window.onclick = function (event) {
            if (event.target == eventDetailModal) {
                eventDetailModal.style.display = "none";
            }
        }

    }

    getEvents() {
        this.events = [];
        this.checkedEvents.clear();
        this.sharedDataService.submitModal.events = [];

        if (this.filter.fromDate.length > 19)
            this.filter.fromDate = this.filter.fromDate.substring(0, this.filter.fromDate.length - 5);
        this.restService.getEvents(this.filter.latitude, this.filter.longitude, this.filter.range, this.filter.fromDate).subscribe(
            data => {
                this.events = data;
                this.events.forEach(event => {
                    event.$$filtered = true;
                });
                this.filteredEventsCount = this.events.length;
                console.log(data);
            },
            err => {
                alert('An error encountered while loading data from server! Please try again.');
            }
        );
    }

    openEventDetailModal(event: any): void {
        this.clickedEvent = event;
        eventDetailModal.style.display = 'block';
    }

    isSearchButtonActive(): boolean {
        return this.filter.latitude && this.filter.longitude && this.filter.range && this.filter.fromDate.length > 0;
    }

    filterEvents(text: string): void {
        text = text.toUpperCase();
        if (text.length !== 0) {
            this.filteredEventsCount = 0;
            this.events.forEach(event => {
                if (
                    (event.name && event.name.toUpperCase().includes(text))
                    || (event.eventType && event.eventType.toUpperCase().includes(text))
                    || (event.description && event.description.toUpperCase().includes(text))
                    || (event.place.name && event.place.name.toUpperCase().includes(text))) {
                    event.$$filtered = true;
                    this.filteredEventsCount++;
                } else {
                    event.$$filtered = false;
                };
            })
        }
    }

    orderByCheckedEvents(): void {
        const checkedEvents = this.checkedEvents;
        this.events.sort(function (a, b) {
            if (checkedEvents.has(a.id) && !checkedEvents.has(b.id)) {
                return -1;
            }
            if (!checkedEvents.has(a.id) && checkedEvents.has(b.id)) {
                return 1;
            }
            return 0;
        });
    }

    // TODO
    submitCheckedEvents(): void {
        this.sharedDataService.openSubmitModal();
        this.sharedDataService.submitModal.events = this.checkedEvents;
    }

    toggleCheckedEvent(id: number): void {
        this.checkedEvents.has(id) ? this.checkedEvents.delete(id) : this.checkedEvents.add(id);
    }

    autoCompleteCallback(event: any): void {
        console.log(event);
        this.filter.latitude = event.data.geometry.location.lat;
        this.filter.longitude = event.data.geometry.location.lng;
    }

}
