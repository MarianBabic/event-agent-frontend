import { Injectable } from '@angular/core';

@Injectable()
export class DummyDataService {

    constructor() { }

    dummyEvents: any = [
        {
            "description": "Kalendár Majstrovstiev Slovenska v rally bude aj v sezóne 2017 uzatvárať obľúbené Rally Košice.",
            "end_time": "2017-10-22T21:00:00+0200",
            "name": "43. Rally Košice",
            "place": {
                "name": "Auto Klub Košice",
                "location": {
                    "city": "Košice",
                    "country": "Slovakia",
                    "latitude": 48.7293,
                    "longitude": 21.24178,
                    "street": "Hroncova 3",
                    "zip": "040 01"
                },
                "id": "136860793037617"
            },
            "start_time": "2017-10-19T18:00:00+0200",
            "id": "137423570205629"
        },
        {
            "description": "Test description 1",
            "end_time": "2017-11-01T10:00:00+0200",
            "name": "Test name 1",
            "place": {
                "name": "Test place 1",
                "location": {
                    "city": "Košice",
                    "country": "Slovakia",
                    "latitude": 48.71690333,
                    "longitude": 21.260797977,
                    "street": "Nám. Osloboditeľov",
                    "zip": "040 01"
                },
                "id": "000000000000000"
            },
            "start_time": "2017-11-01T11:00:00+0200",
            "id": "000000000000001"
        },
        {
            "description": "Test description 2",
            "end_time": "2017-11-02T11:00:00+0200",
            "name": "Test name 2",
            "place": {
                "name": "Test place 2",
                "location": {
                    "city": "Košice",
                    "country": "Slovakia",
                    "latitude": 48.71690333,
                    "longitude": 21.260797977,
                    "street": "Nám. Osloboditeľov",
                    "zip": "040 01"
                },
                "id": "111111111111111"
            },
            "start_time": "2017-11-01T12:00:00+0200",
            "id": "111111111111112"
        },
        {
            "description": "Test description 3",
            "end_time": "2017-11-03T12:00:00+0200",
            "name": "Test name 3",
            "place": {
                "name": "Test place 3",
                "location": {
                    "city": "Košice",
                    "country": "Slovakia",
                    "latitude": 48.71690333,
                    "longitude": 21.260797977,
                    "street": "Nám. Osloboditeľov",
                    "zip": "040 01"
                },
                "id": "222222222222222"
            },
            "start_time": "2017-11-03T13:00:00+0200",
            "id": "222222222222223"
        },
        {
            "description": "Test description 4",
            "end_time": "2017-11-04T13:00:00+0200",
            "name": "Test name 4",
            "place": {
                "name": "Test place 4",
                "location": {
                    "city": "Košice",
                    "country": "Slovakia",
                    "latitude": 48.71690333,
                    "longitude": 21.260797977,
                    "street": "Nám. Osloboditeľov",
                    "zip": "040 01"
                },
                "id": "333333333333333"
            },
            "start_time": "2017-11-04T14:00:00+0200",
            "id": "333333333333334"
        },
        {
            "description": "Test description 5",
            "end_time": "2017-11-05T14:00:00+0200",
            "name": "Test name 5",
            "place": {
                "name": "Test place 5",
                "location": {
                    "city": "Košice",
                    "country": "Slovakia",
                    "latitude": 48.71690333,
                    "longitude": 21.260797977,
                    "street": "Nám. Osloboditeľov",
                    "zip": "040 01"
                },
                "id": "444444444444444"
            },
            "start_time": "2017-11-05T15:00:00+0200",
            "id": "444444444444445"
        },
        {
            "description": "Test description 6",
            "end_time": "2017-11-06T15:00:00+0200",
            "name": "Test name 6",
            "place": {
                "name": "Test place 6",
                "location": {
                    "city": "Košice",
                    "country": "Slovakia",
                    "latitude": 48.71690333,
                    "longitude": 21.260797977,
                    "street": "Nám. Osloboditeľov",
                    "zip": "040 01"
                },
                "id": "555555555555555"
            },
            "start_time": "2017-11-06T16:00:00+0200",
            "id": "555555555555556"
        },
        {
            "description": "Test description 7",
            "end_time": "2017-11-07T16:00:00+0200",
            "name": "Test name 7",
            "place": {
                "name": "Test place 7",
                "location": {
                    "city": "Košice",
                    "country": "Slovakia",
                    "latitude": 48.71690333,
                    "longitude": 21.260797977,
                    "street": "Nám. Osloboditeľov",
                    "zip": "040 01"
                },
                "id": "666666666666666"
            },
            "start_time": "2017-11-07T17:00:00+0200",
            "id": "666666666666667"
        },
        {
            "description": "Test description 8",
            "end_time": "2017-11-08T17:00:00+0200",
            "name": "Test name 8",
            "place": {
                "name": "Test place 8",
                "location": {
                    "city": "Košice",
                    "country": "Slovakia",
                    "latitude": 48.71690333,
                    "longitude": 21.260797977,
                    "street": "Nám. Osloboditeľov",
                    "zip": "040 01"
                },
                "id": "777777777777777"
            },
            "start_time": "2017-11-08T18:00:00+0200",
            "id": "777777777777778"
        },
        {
            "description": "Test description 9",
            "end_time": "2017-11-09T18:00:00+0200",
            "name": "Test name 9",
            "place": {
                "name": "Test place 9",
                "location": {
                    "city": "Košice",
                    "country": "Slovakia",
                    "latitude": 48.71690333,
                    "longitude": 21.260797977,
                    "street": "Nám. Osloboditeľov",
                    "zip": "040 01"
                },
                "id": "888888888888888"
            },
            "start_time": "2017-11-09T19:00:00+0200",
            "id": "888888888888889"
        },
        {
            "description": "Test description 10",
            "end_time": "2017-11-10T19:00:00+0200",
            "name": "Test name 10",
            "place": {
                "name": "Test place 10",
                "location": {
                    "city": "Košice",
                    "country": "Slovakia",
                    "latitude": 48.71690333,
                    "longitude": 21.260797977,
                    "street": "Nám. Osloboditeľov",
                    "zip": "040 01"
                },
                "id": "999999999999999"
            },
            "start_time": "2017-11-10T20:00:00+0200",
            "id": "999999999999990"
        }
    ];

    dummySimilarEvents: any = [
        [
            [this.dummyEvents[0], this.dummyEvents[1]],
            [this.dummyEvents[2], this.dummyEvents[3]],
            [this.dummyEvents[4], this.dummyEvents[5]]
        ], [
            [this.dummyEvents[7], this.dummyEvents[8]],
            [this.dummyEvents[9], this.dummyEvents[10]]
        ]
    ];

}
