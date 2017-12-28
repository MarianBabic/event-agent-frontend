import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestService {

    host: string = 'http://udalosti.kapsa.sk:8080/fb-events/webapi/';

    constructor(private http: HttpClient) { }

}
