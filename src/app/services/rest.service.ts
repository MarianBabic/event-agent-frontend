import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class RestService {

    host: string = 'http://udalosti.kapsa.sk:8080/fbREST/webapi';

    constructor(private http: HttpClient) { }

    /*
        EVENTS
    */

    getEvents(latitude, longitude, radius, startDate): Observable<any> {
        return this.http.get(`${this.host}/filter/${latitude}/${longitude}/${radius}/${startDate}`);
    }

    hintAsEqual(userId, event1Id, event2Id): Observable<any> {
        return this.http.get(`${this.host}/hintAsEqual/${userId}/${event1Id}/${event2Id}`);
    }

    hintAsSubevent(userId, parentId, childId): Observable<any> {
        return this.http.get(`${this.host}/hintAsSubevent/${userId}/${parentId}/${childId}`);
    }

    getUnsolvedSimilarities(): Observable<any> {
        return this.http.get(`${this.host}/unsolvedSimilarities`);
    }

    resolveAsEqual(newEvent, event1Id, event2Id): Observable<any> {
        return this.http.post(`${this.host}/resolvedSimilarities/${event1Id}/${event2Id}`, newEvent);
    }

    resolveAsSubevents(parentId, childId): Observable<any> {
        return this.http.get(`${this.host}/resolvedSimilarities/${parentId}/${childId}`);
    }

    resolveAsUnrelated(event1Id, event2Id): Observable<any> {
        // TODO: null?
        return this.http.put(`${this.host}/resolvedSimilarities/${event1Id}/${event2Id}`, null);
    }

    /*
        ADMIN
    */

    addNewAdmin(newAdmin): Observable<any> {
        return this.http.post(`${this.host}/admin`, newAdmin);
    }

    isAdmin(userId): Observable<any> {
        return this.http.get(`${this.host}/admin/${userId}`);
    }

    /*
        EVENT SOURCES
    */

    addSource(body): Observable<any> {
        return this.http.post(`${this.host}/eventsource`, body);
    }

    updateSourceFrequency(source, newFrequency): Observable<any> {
        return this.http.put(`${this.host}/eventsource/${source}/${newFrequency}`, {});
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
