import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {

    // TODO: change to false
    isAdmin: boolean = true;
    userId: number = 1; // TODO

    confirmationMessage = {
        message: '',
        error: false // confirmation banner gets red colour if true
    }

    submitModal: any = {
        modal: HTMLElement,
        events: <any>[]
    }

    constructor() { }

    /* CONFIRMATION MESSAGES */

    isConfirmationMessageShown(): boolean {
        return this.confirmationMessage.message.length !== 0;
    }

    closeConfirmationMessage(): void {
        this.confirmationMessage.message = '';
    }

    showConfirmationMessage(message: string): void {
        this.confirmationMessage.message = message;
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
