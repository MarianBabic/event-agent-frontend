import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-event-detail-modal',
    templateUrl: './event-detail-modal.component.html',
    styleUrls: ['./event-detail-modal.component.css']
})
export class EventDetailModalComponent implements OnInit {

    @Input() event: any;
    @Input() filter: string;

    constructor() { }

    ngOnInit() {
    }

    closeEventDetailModal(): void {
        document.getElementById('eventDetailModal').style.display = 'none';
    }

}
