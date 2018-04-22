import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Configuration } from '../../common/config/configuration';

import * as io from 'socket.io-client';
import * as QueryString from 'querystring';

@Injectable()
export class ChatService {

	private headers: Headers;
	private socket;
  
	constructor(
		private http: Http,
		private config: Configuration,
	) {
		this.setHTTPHeaders();
	}

	public setHTTPHeaders() {
		this.headers = new Headers();
		this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
		this.headers.set('Accept', 'application/json');

		return this.headers;
	}

	sendMessage(user_id, message) {
		this.socket.emit('SEND_MESSAGE', {
			user: user_id,
			message: message
		})  
	}
	
	getMessages() {
		let observable = new Observable(observer => {
			this.socket = io(this.config.BASE_API_URL);
			this.socket.on('RECEIVE_MESSAGE', (data) => {
				observer.next(data);    
			});
			return () => {
				this.socket.disconnect();
			};  
		})     
		return observable;
	}

	sendTypoSignal(email, workspace) {
		this.socket.emit('SEND_SIGNAL', {
			email: email,
			workspaceId: workspace
		})
	}

	getTypoSignal() {
		let observable = new Observable(observer => {
			this.socket = io(this.config.BASE_API_URL);
			this.socket.on('RECEIVE_SIGNAL', (data) => {
				observer.next(data);    
			});
			return () => {
				this.socket.disconnect();
			};  
		})     
		return observable;
	}

	init_message(): Observable<any> {
		this.setHTTPHeaders();
		return this.http.get(this.config.BASE_API_URL + '/message', {headers: this.headers}).map(res => res.json());
	}  
}