import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { ManageResourcesComponent } from './manage-resources/manage-resources.component';
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
        ViewEventsComponent,
        HighlightPipe
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            appRoutes
        )
    ],
    providers: [DummyDataService, RestService],
    bootstrap: [AppComponent]
})
export class AppModule { }
