import { Component, OnInit } from '@angular/core';

import { SharedDataService } from '../../services/shared-data.service';

@Component({
    selector: 'app-submit-modal',
    templateUrl: './submit-modal.component.html',
    styleUrls: ['./submit-modal.component.css']
})
export class SubmitModalComponent implements OnInit {

    // events are hinted are identical if true, or nested otherwise
    isHintTypeIdentical: boolean = true;

    constructor(public sharedDataService: SharedDataService) { }

    ngOnInit() { }

    setHintType(isHintTypeIdentical): void {
        this.isHintTypeIdentical = isHintTypeIdentical;
    }

    onCancel(): void {
        this.sharedDataService.closeSubmitModal();
    }

    onSubmit(): void {
        this.sharedDataService.closeSubmitModal();
        // TODO: zobrazit mena eventov namiesto ich id
        let idsIiterator = this.sharedDataService.submitModal.events.values();
        this.sharedDataService.confirmationMessage = `You have hinted 2 events as similar: 'id1: ${idsIiterator.next().value}' & 'id2: ${idsIiterator.next().value}'`;
    }

}
