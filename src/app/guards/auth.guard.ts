import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    CanLoad, Route
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthenticationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let url: string = state.url;
        console.log('canActivate: ', url);
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    checkLogin(url: string): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isSignIn()) {
            return true;
        }

        // Navigate to the login page with extras
        this.router.navigate(['']);
        return false;
    }
}
