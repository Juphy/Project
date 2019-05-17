import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { siteinfo, userinfo, DATA } from '@core/store';
import { NzIconService } from 'ng-zorro-antd';
import { ICONS } from '@core/style-icons';
@Injectable({
    providedIn: 'root'
})
export class StartupService {
    constructor(private http: HttpClient) {

    }

    load() {
        console.log("welcome!");
    }

    // load(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         resolve();
    //         reject();
    //     })
    // }
}
