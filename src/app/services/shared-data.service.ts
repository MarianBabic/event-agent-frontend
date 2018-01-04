import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {

    confirmationMessage: string = '';
    submitModal: any = {
        modal: HTMLElement,
        events: <any>[]
    }

    constructor() { }

    /* CONFIRMATION MESSAGES */

    isConfirmationMessageShown(): boolean {
        return this.confirmationMessage.length !== 0;
    }

    closeConfirmationMessage(): void {
        this.confirmationMessage = '';
    }

    showConfirmationMessage(message: string): void {
        this.confirmationMessage = message;
    }

    /* SUBMIT MODAL */

    openSubmitModal(): void {
        this.submitModal.modal = document.getElementById('submitModal');
        this.submitModal.modal.style.display = 'block';
    }

    closeSubmitModal(): void {
        this.submitModal.modal.style.display = 'none';
    }

}
