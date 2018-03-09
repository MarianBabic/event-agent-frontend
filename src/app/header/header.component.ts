import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService } from '../services/rest.service';
import { SharedDataService } from '../services/shared-data.service';

declare var FB: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    userName: string = '';

    constructor(private router: Router, private restService: RestService, public sharedDataService: SharedDataService) {
        FB.init({
            appId: '168254080466042',
            xfbml: true,  // parse social plugins on this page
            version: 'v2.12' // use graph api version 2.12
        });
    }

    ngOnInit() {
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
        FB.Event.subscribe('auth.authResponseChange', response => { this.statusChangeCallback(response); });
        FB.Event.subscribe('auth.statusChange', response => { this.statusChangeCallback(response); });
    }

    getUserName(): void {
        // 2nd option: get id as parameter and exchange me <=> `/${id}`
        FB.api('me/', (response) => {
            if (response && !response.error) {
                this.sharedDataService.userId = response.id;
                this.userName = response.name;
                this.restService.isAdmin(this.sharedDataService.userId).subscribe(
                    success => this.sharedDataService.isAdmin = true,
                    error => this.sharedDataService.confirmationMessage = { message: 'An error encountered while checking your admin privileges!', error: true }
                );
            }
        });
    }

    statusChangeCallback(response) {
        if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire

            // var uid = response.authResponse.userID;
            // var accessToken = response.authResponse.accessToken;

            this.getUserName();
        } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
        } else {
            // the user isn't logged in to Facebook.

            this.userName = '';
            this.sharedDataService.isAdmin = false;
            this.router.navigate(['/home']);
        }
    }

    showUserId(): void {
        alert('My user ID is: ' + this.sharedDataService.userId);
    }

}
