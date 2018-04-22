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
    isTypingUser = '';

    socket: any;
    signals: any;
    messages: any[] = [];
    users: any[] = [];

    userWorkspace = '';
    userEmail = '';
    userId = '';

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
        });
        this.signals = this.chat.getTypoSignal().subscribe(signal => {
            console.log(signal['workspaceId'])
            if (signal['workspaceId'] == this.userWorkspace) {
                if (signal['email'] != this.userEmail) {
                    this.isTypingUser = signal['email'];
                    console.log('isTypingUser: ', this.isTypingUser);
                }
                // this.isTypingUser = signal['email'];
                setTimeout(() => this.isTypingUser = '', 2000);
            }
        });
        this.buildForm();
    }

    ngOnInit() {
        this.chat.init_message().subscribe(res => {
            this.messages = res;
            var model = {
                'workspaceId': "jinyan"
            }
            this.authenticationService.GetUsers(model).subscribe(res => {
                console.log('users: ', res)
                this.users = res;
            },
            err => {
                console.log('get user error: ', err);
            })
        },
        err => {
            console.log('init_message error: ', err);
        })

        this.userWorkspace = this.sharedData.getSession('workspace');
        this.userEmail = this.sharedData.getSession('email');
        this.userId = this.sharedData.getSession('_id');
    }

    private buildForm(): void {
        this.appForm = this.fb.group({
            'message': ['', Validators.compose([Validators.required])],
        });
    }

    onSubmit(message: FormGroup): void {
        this.chat.sendMessage(this.userId, message.controls['message'].value);
        this.appForm.reset();
    }

    onKey(event: any) { // without type info
        this.chat.sendTypoSignal(this.userEmail, this.userWorkspace);
    }

    ngOnDestroy() {
        this.socket.unsubscribe();
        this.signals.unsubscribe();
    }
}
