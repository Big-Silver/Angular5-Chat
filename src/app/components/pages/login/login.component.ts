import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

    constructor(
    ) {
    }

    ngOnInit() {
    }
}
