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

// pipes
import { HighlightPipe } from './pipes/highlight.pipe';

// services
import { DummyDataService } from './services/dummy-data.service';
import { RestService } from './services/rest.service';

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
        HighlightPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes
        ),
        Ng4GeoautocompleteModule.forRoot()
    ],
    providers: [DummyDataService, RestService],
    bootstrap: [AppComponent]
})
export class AppModule { }
