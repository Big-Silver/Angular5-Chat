import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Configuration } from '../../../common/config/configuration';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SignupComponent implements OnInit {

    private headers: Headers;

    constructor(
    ) { }

    ngOnInit() {
    }
}
