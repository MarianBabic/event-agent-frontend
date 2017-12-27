import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

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

    constructor() { }

    ngOnInit() { }

    // TODO
    onSubmit(index: number, form: NgForm): void {
        console.log(form);
    }

    // TODO
    register(form: NgForm): void {
        console.log('Successful registration');
        console.log(form);
    }

}
