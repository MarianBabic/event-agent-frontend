import { Component, OnInit } from '@angular/core';

import { RestService } from '../../services/rest.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
    selector: 'app-submit-modal',
    templateUrl: './submit-modal.component.html',
    styleUrls: ['./submit-modal.component.css']
})
export class SubmitModalComponent implements OnInit {

    // events are hinted as identical if true, or nested otherwise
    isHintTypeIdentical: boolean = true;
    event1: string = '';
    event2: string = '';
    checkboxes = {
        parent1: false,
        parent2: false,
        child1: false,
        child2: false
    };
    checkboxesChecked: number = 0;

    constructor(private restService: RestService, public sharedDataService: SharedDataService) { }

    ngOnInit() { }

    setHintType(isHintTypeIdentical): void {
        this.isHintTypeIdentical = isHintTypeIdentical;
        const idsIiterator = this.sharedDataService.submitModal.events.values();
        this.event1 = idsIiterator.next().value;
        this.event2 = idsIiterator.next().value;
    }

    toggleCheckboxes(checkbox: string): void {
        if ((checkbox === 'parent1' && this.checkboxes.parent1) || (checkbox === 'child2' && this.checkboxes.child2)) {
            this.checkboxes.parent1 = true;
            this.checkboxes.child1 = false;
            this.checkboxes.parent2 = false;
            this.checkboxes.child2 = true;
        } else if ((checkbox === 'parent2' && this.checkboxes.parent2) || (checkbox === 'child1' && this.checkboxes.child1)) {
            this.checkboxes.parent1 = false;
            this.checkboxes.child1 = true;
            this.checkboxes.parent2 = true;
            this.checkboxes.child2 = false;
        }

        this.checkboxesChecked = 0;
        for (var key in this.checkboxes) {
            if (this.checkboxes[key]) this.checkboxesChecked++;
        }
    }

    onCancel(): void {
        this.sharedDataService.closeSubmitModal();
    }

    isSubmitDisabled(): boolean {
        return !this.isHintTypeIdentical && this.checkboxesChecked !== 2;
    }

    onSubmit(): void {
        this.sharedDataService.closeSubmitModal();
        if (this.isHintTypeIdentical) {
            const idsIiterator = this.sharedDataService.submitModal.events.values();
            this.event1 = idsIiterator.next().value;
            this.event2 = idsIiterator.next().value;
            this.restService.hintAsEqual(this.sharedDataService.userId, this.event1, this.event2).subscribe(
                success => this.sharedDataService.confirmationMessage = {
                    message: `You have hinted 2 events as identical: 'id1: ${this.event1}' & 'id2: ${this.event2}'`,
                    error: false
                },
                error => this.sharedDataService.confirmationMessage = {
                    message: 'Your hint was not accepted. Please try again!',
                    error: true
                }
            );
        } else {
            const parentId = this.checkboxes.parent1 ? this.event1 : this.event2;
            const childId = this.checkboxes.child1 ? this.event1 : this.event2;
            this.restService.hintAsSubevent(this.sharedDataService.userId, parentId, childId).subscribe(
                success => this.sharedDataService.confirmationMessage = {
                    message: `You have hinted that the event 'id1: ${parentId}' is parent of the event 'id2: ${childId}'`,
                    error: false
                },
                error => this.sharedDataService.confirmationMessage = {
                    message: 'Your hint was not accepted. Please try again!',
                    error: true
                }
            );
        }
    }

}
