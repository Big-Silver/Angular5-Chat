import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';

import { ChangepasswordModel } from '../../../models/base.model.data';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ValidationService } from '../../../services/validation/validation.service';
import { SharedDataService } from '../../../services/shared-data/shared-data.service';

@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.css'],
})
export class ChangePasswordComponent implements OnInit {

    public account = {
        password: <string>null
    };
    public barLabel: string = "Password strength:";
    public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

    formErrorMsg = '';
    formErrorMsgSecondInfo = '';
    formError = false;
    appForm: FormGroup;
    isSubmited = false;
    loginAttempt = false;
    model: ChangepasswordModel;
    processing = false;
    timedOut = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private routeParams: ActivatedRoute,
        private sharedData: SharedDataService
    ) {
        this.buildForm();
    }

    ngOnInit() {
    }

    private buildForm(): void {
        this.appForm = this.fb.group({
            'oldpassword': ['', Validators.compose([Validators.required, ValidationService.allBlankSpaces])],
            'newpassword': ['', Validators.compose([Validators.required, ValidationService.customerNameValidatorSpecialCharacters6letters])],
            'confirmpassword': ['', Validators.compose([Validators.required, ValidationService.customerNameValidatorSpecialCharacters6letters])],
        });
    }

    private callChangePassword(changePasswordModel) {
        if (changePasswordModel.valid) {
        this.processing = true;
        this.formError = false;

            this.authenticationService.changePassword(this.model).subscribe(res => {
              if (this.sharedData) {
                this.sharedData.storeSessionData(res);
              }
                this.isSubmited = false;
                this.model = null;
                this.processing = false;
                this.router.navigate(['home']);
            },
            err => {

                let _errorBody;
                if (err['_body']) {
                    _errorBody = JSON.parse(err['_body'])[0];
                }
                    switch (err.status) {
                        case 400:
                            break;
                        case 403:                
                            break;
                        case 500:
                            break;
                        default:
                            this.formErrorMsg = 'An error occurred attempting to sign in. Please try again.';
                }

                this.formError = true;
                this.isSubmited = false;
                this.processing = false;
                this.model = null;
            });
        }
    }

    onSubmit(changePasswordModel: FormGroup): void {
        this.isSubmited = true;

        this.model = {
            'workspaceId' : 'jinyan',
            'email': this.sharedData.getSessionData().email,
            'password': changePasswordModel.controls['oldpassword'].value,
            'newPassword': changePasswordModel.controls['newpassword'].value,
        };
        this.callChangePassword(changePasswordModel);
    }
}
