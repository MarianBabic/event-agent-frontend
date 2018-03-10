import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

    constructor(private router: Router, private restService: RestService, private sharedDataService: SharedDataService) { }

    ngOnInit() {
        if (!this.sharedDataService.isAdmin)
            this.router.navigate(['/home']);

        this.sharedDataService.loader = true;
        this.restService.getSources().subscribe(
            sources => {
                this.sources = sources;
                this.sharedDataService.loader = false;
            },
            error => {
                this.sharedDataService.showConfirmationMessage('Event sources could not be loaded due to an error!', true);
                this.sharedDataService.loader = false;
            });
        this.restService.getTypes().subscribe(
            types => {
                this.defaultTypes = types.eventDefaultTypes;
                this.sourceTypes = types.sourceTypes;
            },
            error => this.sharedDataService.showConfirmationMessage('Event types could not be loaded due to an error!', true)
        );
    }

    addNewAdmin(): void {
        const body = { adminFbId: this.newAdmin };
        this.restService.addNewAdmin(body).subscribe(
            success => {
                this.sharedDataService.showConfirmationMessage(`You have added new admin with user id: '${this.newAdmin}'`, false);
                this.newAdmin = null;
            },
            error => this.sharedDataService.showConfirmationMessage('New admin was not added due to an error!', true)
        );
    }

    updateFrequency(source, newFrequency): void {
        this.restService.updateSourceFrequency(source.sourceURL, newFrequency).subscribe(
            response => {
                for (let i = 0; i < this.sources.length; i++) {
                    if (this.sources[i].id === response.id)
                        this.sources[i] = response;
                };
                this.sharedDataService.showConfirmationMessage(`You have changed frequency of event source '${source.sourceURL}' to ${newFrequency} hour(s).`, false);
            },
            error => this.sharedDataService.showConfirmationMessage(`The frequency of event source '${source.sourceURL}' was not changed due to an error!`, true)
        );
    }

    deleteSource(source): void {
        this.restService.deleteSource(source.sourceURL).subscribe(
            success => {
                for (let i = this.sources.length - 1; i >= 0; i--) {
                    if (this.sources[i].id === source.id)
                        this.sources.splice(i, 1);
                }
                this.sharedDataService.showConfirmationMessage(`You have deleted event source: '${source.sourceURL}'`, false);
            },
            error => this.sharedDataService.showConfirmationMessage(`The event source '${source.sourceURL}' was not deleted due to an error!`, true)
        );
    }

    addSource(): void {
        this.restService.addSource(this.newSource).subscribe(
            newSource => {
                this.sources.push(newSource);
                this.sharedDataService.showConfirmationMessage(`You have added new event source: '${this.newSource.source}'`, false);
                this.newSource = {
                    defaultType: null,
                    frequency: null,
                    source: null,
                    sourceType: null,
                };
            },
            error => this.sharedDataService.showConfirmationMessage('New source was not added due to an error!', true)
        );
    }

    isNewSourceValid(): boolean {
        return this.newSource.source && this.newSource.frequency && this.newSource.sourceType && this.newSource.defaultType;
    }

}
