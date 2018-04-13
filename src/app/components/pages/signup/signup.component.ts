import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';

import { SignupModel } from '../../../models/base.model.data';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ValidationService } from '../../../services/validation/validation.service';
import { SharedDataService } from '../../../services/shared-data/shared-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {

  formErrorMsg = '';
  formErrorMsgSecondInfo = '';
  formError = false;
  appForm: FormGroup;
  isSubmited = false;
  loginAttempt = false;
  model: SignupModel;
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
      'username': ['', Validators.compose([Validators.required, ValidationService.allBlankSpaces])],
      'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      'password': ['', Validators.compose([Validators.required, ValidationService.allBlankSpaces])],
      'confirmpassword': ['', Validators.compose([Validators.required, ValidationService.allBlankSpaces])],
    });
  }

  private callAuthenticationService(loginModel) {
    if (loginModel.valid) {
      this.processing = true;
      this.formError = false;

      this.authenticationService.SignupUser(this.model).subscribe(res => {
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
  
  onSubmit(signupModel: FormGroup): void {
    this.isSubmited = true;

    this.model = {
      'workspaceId': "jinyan",
      'username': signupModel.controls['username'].value,
      'email': signupModel.controls['email'].value,
      'password': signupModel.controls['password'].value,
      'confirmpassword': signupModel.controls['confirmpassword'].value,
    };

    this.callAuthenticationService(signupModel);
  }
}
