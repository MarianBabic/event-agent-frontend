import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DummyDataService } from '../services/dummy-data.service';
import { RestService } from '../services/rest.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
    selector: 'app-manage-resources',
    templateUrl: './manage-resources.component.html',
    styleUrls: ['./manage-resources.component.css']
})
export class ManageResourcesComponent implements OnInit {

    newAdmin: number;
    newSource = null;
    sources;
    // TODO: change to rest response
    defaultTypes = ['unspecified', 'movie', 'concert'];
    sourceTypes = ['page', 'group', 'user'];

    constructor(
        private dummyDataService: DummyDataService,
        private restService: RestService,
        private sharedDataService: SharedDataService) { }

    ngOnInit() {
        this.newSource = this.sharedDataService.newSourceTemplate;
        this.restService.getSources().subscribe(sources => this.sources = sources);
        // TODO:
        this.sources = this.dummyDataService.dummySources;
    }

    addNewAdmin(): void {
        const body = { adminFbId: this.newAdmin };
        this.sharedDataService.confirmationMessage = `You have added new admin with id: '${this.newAdmin}'`;
        this.restService.addNewAdmin(body).subscribe();
        this.newAdmin = null;
    }

    addSource(): void {
        console.log(this.newSource);
        let body = {
            source: '331514527167',
            sourceType: 'page',
            defaultType: 'unspecified',
            frequency: '1',
            added: null,
            lastCheckResult: null,
            lastCheckTime: null,
            nextCheckTime: null
        };
        this.restService.addSource(this.newSource);
        this.newSource = this.sharedDataService.newSourceTemplate;
    }

    isNewSourceValid(): boolean {
        return this.newSource.defaultType.length && this.newSource.frequency && this.newSource.source > 0 && this.newSource.sourceType;
    }

    deleteSource(source): void {
        // TODO
        console.log(source);
        for (let i = this.sources.length - 1; i >= 0; i--) {
            if (this.sources[i].sourceURL === source.sourceURL) {
                this.sources.splice(i, 1);
            }
        }
        this.sharedDataService.confirmationMessage = `You have deleted event source: '${source.sourceURL}'`;
        this.restService.deleteSource(source);
    }

    updateFrequency(source, newFrequency): void {
        this.sharedDataService.confirmationMessage = `You have updated frequency of event source '${source.sourceURL}' to ${newFrequency} hour(s).`;
        this.restService.updateSourceFrequency(source.sourceURL, newFrequency).subscribe();
    }

}
