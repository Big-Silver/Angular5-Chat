import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ValidationService } from '../../../services/validation/validation.service';
import { SharedDataService } from '../../../services/shared-data/shared-data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sharedData: SharedDataService,
    ) {}

    ngOnInit() {
    }

    public logOut() {
        this.sharedData.clearSession();
        this.router.navigate(['']);
    }
}
