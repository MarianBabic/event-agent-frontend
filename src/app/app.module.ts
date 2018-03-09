import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { ManageResourcesComponent } from './manage-resources/manage-resources.component';
import { PairComponent } from './manage-events/pair/pair.component';
import { ViewEventsComponent } from './view-events/view-events.component';

// modals
import { EventDetailModalComponent } from './modals/event-detail-modal/event-detail-modal.component';
import { SubmitModalComponent } from './modals/submit-modal/submit-modal.component';

// pipes
import { HighlightPipe } from './pipes/highlight.pipe';
import { SafePipe } from './pipes/safe.pipe';

// services
import { DummyDataService } from './services/dummy-data.service';
import { RestService } from './services/rest.service';
import { SharedDataService } from './services/shared-data.service';

const appRoutes: Routes = [
    { path: 'home', component: ViewEventsComponent },
    { path: 'manage-events', component: ManageEventsComponent },
    { path: 'manage-resources', component: ManageResourcesComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ManageEventsComponent,
        ManageResourcesComponent,
        PairComponent,
        ViewEventsComponent,
        EventDetailModalComponent,
        SubmitModalComponent,
        HighlightPipe,
        SafePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        Ng4GeoautocompleteModule.forRoot()
    ],
    providers: [DummyDataService, RestService, SharedDataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
