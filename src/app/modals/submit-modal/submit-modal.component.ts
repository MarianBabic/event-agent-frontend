import { Component, OnInit } from '@angular/core';

import { SharedDataService } from '../../services/shared-data.service';

@Component({
    selector: 'app-submit-modal',
    templateUrl: './submit-modal.component.html',
    styleUrls: ['./submit-modal.component.css']
})
export class SubmitModalComponent implements OnInit {

    constructor(public sharedDataService: SharedDataService) { }

    ngOnInit() { }

}
