import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { DummyDataService } from '../../services/dummy-data.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
    selector: 'app-pair',
    templateUrl: './pair.component.html',
    styleUrls: ['./pair.component.css']
})
export class PairComponent implements OnInit {

    @Input() pair: any[];
    @Input() isLast: boolean;
    @Input() hasForm: boolean;
    @ViewChild('form') private form: NgForm;

    constructor(private sharedDataService: SharedDataService, private dummyDataService: DummyDataService) { }

    ngOnInit() { }

    isFormValid(): boolean {
        return this.form['name'] && this.form['description'] && this.form['start_time'] && this.form['end_time'] && this.form['placeName'];
    }

    // TODO
    onSubmit(index: number): void {
        console.log(this.form);
        this.deletePair();
        // TODO: scroll to the top so message is visible
        this.sharedDataService.confirmationMessage = `You have submitted the hinted pair of events: '${this.pair[0].name}' & '${this.pair[1].name}'`;
    }

    onDelete(): void {
        // TODO: call rest to delete the pair from the server
        this.deletePair();
        // TODO: scroll to the top so message is visible
        this.sharedDataService.confirmationMessage = `You have deleted the hinted pair of events: '${this.pair[0].name}' & '${this.pair[1].name}'`;
    }

    // deleted the pair of events locally from the browser
    private deletePair(): void {
        if (this.hasForm) {
            for (let i = this.dummyDataService.dummySimilarEvents[0].length - 1; i >= 0; i--) {
                if (this.dummyDataService.dummySimilarEvents[0][i][0].id === this.pair[0].id && this.dummyDataService.dummySimilarEvents[0][i][1].id === this.pair[1].id) {
                    this.dummyDataService.dummySimilarEvents[0].splice(i, 1);
                }
            }
        } else {
            for (let i = this.dummyDataService.dummySimilarEvents[1].length - 1; i >= 0; i--) {
                if (this.dummyDataService.dummySimilarEvents[1][i][0].id === this.pair[0].id && this.dummyDataService.dummySimilarEvents[1][i][1].id === this.pair[1].id)
                    this.dummyDataService.dummySimilarEvents[1].splice(i, 1);
            }
        }
    }

    // TODO
    register(form: NgForm): void {
        console.log('Successful registration');
        console.log(form);
    }

}
