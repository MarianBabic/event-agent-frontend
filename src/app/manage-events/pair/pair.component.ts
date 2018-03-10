import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { RestService } from '../../services/rest.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
    selector: 'app-pair',
    templateUrl: './pair.component.html',
    styleUrls: ['./pair.component.css']
})
export class PairComponent implements OnInit {

    @Input() pair: any[];
    @Input() isLast: boolean;
    newEvent = {
        description: '',
        endTime: '',
        equalEvents: [],
        eventSourceUrl: '',
        eventType: '',
        id: '',
        name: '',
        parentEventId: '',
        place: {
            location: {
                city: '',
                country: '',
                latitude: null,
                longitude: null,
                street: '',
                zip: ''
            },
            name: ''
        },
        startTime: '',
        subEvents: [],
        url: ''
    };

    constructor(private restService: RestService, private sharedDataService: SharedDataService) { }

    ngOnInit() { }

    isFormValid(): boolean {
        // parentEventId is not required, equalEvents & subEvents arrays may be empty
        return this.newEvent.description.length > 0 && this.newEvent.endTime.length > 0 && this.newEvent.eventSourceUrl.length > 0 && this.newEvent.eventType.length > 0
            && this.newEvent.id.length > 0 && this.newEvent.name.length > 0 && this.newEvent.place.location.city.length > 0 && this.newEvent.place.location.country.length > 0
            && this.newEvent.place.location.latitude && this.newEvent.place.location.longitude && this.newEvent.place.location.street.length > 0 && this.newEvent.place.location.zip.length > 0
            && this.newEvent.place.name.length > 0 && this.newEvent.startTime.length > 0 && this.newEvent.url.length > 0;
    }

    onSubmit(index: number): void {
        this.newEvent.equalEvents = this.pair['eventOne'].equalEvents.concat(this.pair['eventTwo'].equalEvents);
        this.newEvent.subEvents = this.pair['eventOne'].subEvents.concat(this.pair['eventTwo'].subEvents);
        this.restService.resolveAsEqual(this.newEvent, this.pair['eventOne'].id, this.pair['eventTwo'].id).subscribe(
            result => {
                this.deletePair();
                this.sharedDataService.confirmationMessage = {
                    message: `You have merged the pair of events: '${this.pair['id']}'`,
                    error: false
                };
            },
            error => this.sharedDataService.confirmationMessage = { message: `Your request to merge the pair of events: '${this.pair['id']}' was not finished successfully.`, error: true }
        );
    }

    resolveAsSubevents(subEvent: number): void {
        const parentId = (subEvent === 1) ? this.pair['eventTwo'].id : this.pair['eventOne'].id;
        const childId = (subEvent === 1) ? this.pair['eventOne'].id : this.pair['eventTwo'].id;
        this.restService.resolveAsSubevents(parentId, childId).subscribe(
            result => {
                this.sharedDataService.confirmationMessage = { message: `You have marked the event '${childId}' to be subevent of event '${parentId}'`, error: false };
                this.deletePair();
            },
            error => {
                this.sharedDataService.confirmationMessage = {
                    message: `Your request to mark the event '${childId}' to be subevent of event '${parentId}' was not finished successfully. You were to make 3 levels of subevents (parent - child - grandchild)`,
                    error: true
                };
            }
        );
    }

    onDelete(): void {
        // to delete the pair from the server
        this.restService.resolveAsUnrelated(this.pair['eventOne'].id, this.pair['eventTwo'].id).subscribe(
            result => {
                this.sharedDataService.confirmationMessage = {
                    message: `You have marked the pair of events: '${this.pair['id']}' as unrelated`,
                    error: false
                };
                this.deletePair();
            },
            error => {
                this.sharedDataService.confirmationMessage = { message: `Your request to resolve the pair of events was not finished successfully!`, error: true };
            }
        );
    }

    // to delete the pair locally from the browser
    private deletePair(): void {
        for (let i = this.sharedDataService.similarEvents.length - 1; i >= 0; i--) {
            if (this.sharedDataService.similarEvents[i].id === this.pair['id']) {
                this.sharedDataService.similarEvents.splice(i, 1);
                this.sharedDataService.similarEvents.push(this.sharedDataService.similarEventsAll[0]);
                this.sharedDataService.similarEventsAll.splice(0, 1);
            }
        }
    }

}
