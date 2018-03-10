import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {

    loader: boolean = true;

    isAdmin: boolean = false;
    userId: number = 0;

    confirmationMessage = {
        message: '',
        error: false // confirmation banner gets red colour if true
    }

    submitModal: any = {
        modal: HTMLElement,
        events: <any>[]
    }

    // for manage events component
    similarEvents: any[] = [];
    similarEventsAll: any[] = [];

    constructor() { }

    /* CONFIRMATION MESSAGES */

    isConfirmationMessageShown(): boolean {
        return this.confirmationMessage.message.length !== 0;
    }

    closeConfirmationMessage(): void {
        this.confirmationMessage.message = '';
    }

    showConfirmationMessage(message: string, error: boolean): void {
        this.confirmationMessage.message = message;
        this.confirmationMessage.error = error;
        window.scrollTo(0, 0);
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
