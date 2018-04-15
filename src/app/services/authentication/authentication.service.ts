import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Configuration } from '../../common/config/configuration';

import * as QueryString from 'querystring';
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
        sessionStorage.removeItem('sessionData');
        this.router.navigate(['']);
    }

    public isSignIn(): boolean {
        const sessionData = sessionStorage.getItem('sessionData');
        if (sessionData) {
            return true;
        }
        return false;
    }

    public signout(expired?: boolean) {
        this.forceLogout(expired);
    }

    public setHTTPHeaders() {
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Accept', 'application/json');

        return this.headers;
    }

    AuthenticateUser(credentials: any): Observable<any> {
        this.setHTTPHeaders();
        var data = QueryString.stringify({
            "workspaceId": credentials.workspaceId, 
            "email": credentials.email,
            "password": credentials.password
        });
        return this.http.post(this.config.BASE_API_URL + '/login', data,
        {headers: this.headers}).map(res => res.json());
    }

    SignupUser(credentials: any): Observable<any> {
        this.setHTTPHeaders();
        var data = QueryString.stringify({
            "name": credentials.username,
            "workspace": credentials.workspaceId,
            "email": credentials.email,
            "password": credentials.password
        });
        return this.http.post(this.config.BASE_API_URL + '/register', data,
        {headers: this.headers}).map(res => res.json());
    }

    changePassword(credentials: any): Observable<any> {
        this.setHTTPHeaders();
        var data = QueryString.stringify({
            "workspaceId": credentials.workspaceId,
            "email": credentials.email,
            "password": credentials.password,
            "newPassword": credentials.newPassword
        });
        // console.log(data);
        return this.http.post(this.config.BASE_API_URL + '/changepassword', data,
        {headers: this.headers}).map(res => res.json());
    }
}
