import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { RestService } from '../../services/rest.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
    selector: 'app-pair',
    templateUrl: './pair.component.html',
    styleUrls: ['./pair.component.css']
})
export class PairComponent implements OnInit {

    @Input() pair: any[];
    @Input() isLast: boolean;
    @ViewChild('form') private form: NgForm;

    constructor(private restService: RestService, private sharedDataService: SharedDataService) { }

    ngOnInit() { }

    isFormValid(): boolean {
        return this.form['name'] && this.form['description'] && this.form['startTime'] && this.form['endTime'] && this.form['placeName'];
    }

    // TODO
    onSubmit(index: number): void {
        console.log(this.form);
        let newEvent = this.form.form.value;
        console.log(newEvent);
        // this.restService.resolveAsEqual(newEvent, this.pair['eventOne'].id, this.pair['eventTwo'].id).subscribe();
        this.deletePair();
        // TODO: scroll to the top so message is visible
        this.sharedDataService.confirmationMessage = {
            message: `You have merged the pair of events: '${this.pair['id']}'`,
            error: false
        };
    }

    resolveAsSubevents(subEvent: number): void {
        const parentId = (subEvent === 1) ? this.pair['eventTwo'].id : this.pair['eventOne'].id;
        const childId = (subEvent === 1) ? this.pair['eventOne'].id : this.pair['eventTwo'].id;
        this.restService.resolveAsSubevents(parentId, childId).subscribe(
            result => this.sharedDataService.confirmationMessage = { message: `You have marked the event '${childId}' to be subevent of event '${parentId}'`, error: false },
            error => {
                this.sharedDataService.confirmationMessage = {
                    message: `Your request to mark the event '${childId}' to be subevent of event '${parentId}' was not finished successfully. You were to make 3 levels of subevents (parent - child - grandchild)`,
                    error: true
                };
            }
        );
    }

    onDelete(): void {
        // to delete the pair from the server
        this.restService.resolveAsUnrelated(this.pair['eventOne'].id, this.pair['eventTwo'].id).subscribe();
        // to delete the pair locally from the browser
        this.deletePair();
        // TODO: scroll to the top so message is visible
        this.sharedDataService.confirmationMessage = {
            message: `You have marked the pair of events: '${this.pair['id']}' as unrelated`,
            error: false
        };
    }

    private deletePair(): void {
        // for (let i = this.similarEvents[0].length - 1; i >= 0; i--) {
        //     if (this.similarEvents[0][i][0].id === this.pair[0].id && this.similarEvents[0][i][1].id === this.pair[1].id) {
        //         this.similarEvents[0].splice(i, 1);
        //     }
        // }
    }

    // TODO
    register(form: NgForm): void {
        console.log('Successful registration');
        console.log(form);
    }

}
