import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class SharedDataService {

    public customerId: string = null;
    public accountId: string = null;
    public accountName: string = null;
    public customerName: string = null;
    public approvalPendingCount: number = null;

    constructor() {
    }

    public storeSessionData(res: any) {
        sessionStorage.setItem('sessionData', JSON.stringify(res));
    }

    public updateSessionData(res: any) {
        sessionStorage.setItem('sessionData', res);
        sessionStorage.setItem('_st', String(moment().format('X')));
    }

    public getSessionData() {
        const _sessionData = sessionStorage.getItem('sessionData');
        if (_sessionData) {
            return JSON.parse(_sessionData);
        }
        return null;
    }

    public getSession(value): string {
        const sessionData = this.getSessionData();
        return sessionData ? sessionData[value] : null;
    }

    public clearSession() {
        const _sessionData = sessionStorage.getItem('sessionData');
        if (_sessionData) {
            sessionStorage.clear();
        }
        return null;
    }
}
