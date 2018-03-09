import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RestService } from '../services/rest.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
    selector: 'app-manage-resources',
    templateUrl: './manage-resources.component.html',
    styleUrls: ['./manage-resources.component.css']
})
export class ManageResourcesComponent implements OnInit {

    newAdmin: number;
    sources;
    defaultTypes = [];
    sourceTypes = [];
    newSource = {
        defaultType: null,
        frequency: null,
        source: null,
        sourceType: null,
    };

    constructor(private restService: RestService, private sharedDataService: SharedDataService) { }

    ngOnInit() {
        this.restService.getSources().subscribe(
            sources => this.sources = sources,
            error => this.sharedDataService.confirmationMessage = { message: 'Event sources could not be loaded due to an error!', error: true });
        this.restService.getTypes().subscribe(
            types => {
                this.defaultTypes = types.eventDefaultTypes;
                this.sourceTypes = types.sourceTypes;
            },
            error => this.sharedDataService.confirmationMessage = { message: 'Event types could not be loaded due to an error!', error: true }
        );
    }

    addNewAdmin(): void {
        const body = { adminFbId: this.newAdmin };
        this.restService.addNewAdmin(body).subscribe(
            success => {
                this.sharedDataService.confirmationMessage = {
                    message: `You have added new admin with user id: '${this.newAdmin}'`,
                    error: false
                };
                this.newAdmin = null;
            },
            error => {
                this.sharedDataService.confirmationMessage = {
                    message: 'New admin was not added due to an error!',
                    error: true
                };
            }
        );
    }

    updateFrequency(source, newFrequency): void {
        this.restService.updateSourceFrequency(source.sourceURL, newFrequency).subscribe(
            response => {
                for (let i = 0; i < this.sources.length; i++) {
                    if (this.sources[i].id === response.id)
                        this.sources[i] = response;
                };
                this.sharedDataService.confirmationMessage = {
                    message: `You have changed frequency of event source '${source.sourceURL}' to ${newFrequency} hour(s).`,
                    error: false
                };
            },
            error => {
                this.sharedDataService.confirmationMessage = {
                    message: `The frequency of event source '${source.sourceURL}' was not changed due to an error!`,
                    error: true
                };
            }
        );
    }

    deleteSource(source): void {
        this.restService.deleteSource(source.sourceURL).subscribe(
            success => {
                for (let i = this.sources.length - 1; i >= 0; i--) {
                    if (this.sources[i].id === source.id)
                        this.sources.splice(i, 1);
                }
                this.sharedDataService.confirmationMessage = {
                    message: `You have deleted event source: '${source.sourceURL}'`,
                    error: false
                };
            },
            error => {
                this.sharedDataService.confirmationMessage = {
                    message: `The event source '${source.sourceURL}' was not deleted due to an error!`,
                    error: true
                };
            }
        );
    }

    addSource(): void {
        this.restService.addSource(this.newSource).subscribe(
            newSource => {
                this.sources.push(newSource);
                this.sharedDataService.confirmationMessage = {
                    message: `You have added new event source: '${this.newSource.source}'`,
                    error: false
                };
                this.newSource = {
                    defaultType: null,
                    frequency: null,
                    source: null,
                    sourceType: null,
                };
            },
            error => {
                this.sharedDataService.confirmationMessage = {
                    message: 'New source was not added due to an error!',
                    error: true
                };
            }
        );
    }

    isNewSourceValid(): boolean {
        return this.newSource.source && this.newSource.frequency && this.newSource.sourceType && this.newSource.defaultType;
    }

}
