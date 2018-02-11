import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class RestService {

    host: string = 'http://udalosti.kapsa.sk:8080/fbREST/webapi';

    constructor(private http: HttpClient) { }

    /*
        ADMIN
    */

    addNewAdmin(body): Observable<any> {
        return this.http.post(`${this.host}/admin`, body);
    }

    isAdmin(id): Observable<any> {
        return this.http.get(`${this.host}/admin/${id}`);
    }

    /*
        EVENT SOURCES
    */

    addSource(body): Observable<any> {
        return this.http.post(`${this.host}/eventsource`, body);
    }

    updateSourceFrequency(source, frequency): Observable<any> {
        return this.http.put(`${this.host}/eventsource/${source}/${frequency}`, {});
    }

    getSources(): Observable<any> {
        return this.http.get(`${this.host}/eventsource`);
    }

    getTypes(): Observable<any> {
        return this.http.get(`${this.host}/getTypes`);
    }

    deleteSource(source): Observable<any> {
        return this.http.delete(`${this.host}/eventsource/${source}`);
    }

}
