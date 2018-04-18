import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ValidationService } from '../../../services/validation/validation.service';
import { SharedDataService } from '../../../services/shared-data/shared-data.service';
import { ChatService } from '../../../services/chat/chat.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    formErrorMsg = '';
    formErrorMsgSecondInfo = '';
    formError = false;
    appForm: FormGroup;
    isSubmited = false;
    loginAttempt = false;
    processing = false;
    timedOut = false;

    socket: any;
    messages:any[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private routeParams: ActivatedRoute,
        private sharedData: SharedDataService,
        private chat: ChatService,
    ) {
        this.socket = this.chat.getMessages().subscribe(message => {
            this.messages.push(message);
        })
        this.buildForm();
    }

    ngOnInit() {
        this.chat.init_message().subscribe(res => {
            console.log('init_message: ', res)
            this.messages = res;
        },
        err => {
            console.log('init_message error: ', err)
        })
    }

    private buildForm(): void {
        this.appForm = this.fb.group({
            'message': ['', Validators.compose([Validators.required])],
        });
    }

    onSubmit(message: FormGroup): void {
        var user_id = this.sharedData.getSession('_id');
        this.chat.sendMessage(user_id, message.controls['message'].value);
        this.appForm.reset();
    }

    ngOnDestroy() {
        this.socket.unsubscribe();
    }
}
