import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Configuration } from '../../common/config/configuration';

import * as moment from 'moment';

@Injectable()
export class AuthenticationService {

    private headers: Headers;

    constructor(
        private router: Router,
        private http: Http,
        private config: Configuration,
    ) {
        this.setHTTPHeaders();
    }

    public forceLogout(expired?: boolean) {
        sessionStorage.clear();
        this.router.navigate(['']);
        // if (expired) {
        //     this.router.navigate(['']);
        // } else {
        //     this.router.navigate(['']);
        // }
    }

    public isSignIn(): boolean {
        const sessionData = sessionStorage.getItem('user_id');
        if (sessionData) {
            return true;
        }
        return false;
    }

    public signout(expired?: boolean) {
        this.forceLogout(expired);
    }

    public validateToken() {
        // GET TOKEN
        return true;
    }

    public isSessionActive(): boolean {
        // if (this.validateToken()) {
            const loggedInTime = moment(sessionStorage.getItem('_st'), ['X']),
                now = moment();
            if (now.diff(loggedInTime, 'minutes') >= this.config.SESSION_TIMEOUT_END_TIME) {
                this.signout(true);
            }
            return now.diff(loggedInTime, 'minutes') <= this.config.SESSION_TIMEOUT_END_TIME;
        // }
    }

    public setHTTPHeaders() {
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Accept', 'application/json');

        return this.headers;
    }
}
