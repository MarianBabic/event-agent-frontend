import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {

    confirmationMessage: string = '';

    constructor() { }

    isConfirmationMessageShown(): boolean {
        return this.confirmationMessage.length !== 0;
    }

    closeConfirmationMessage(): void {
        this.confirmationMessage = '';
    }

    showConfirmationMessage(message: string): void {
        this.confirmationMessage = message;
    }

}
