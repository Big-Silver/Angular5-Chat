import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public BASE_API_URL: string = 'http://35.167.50.69/kanopp/backend/laravel/public/api';

    public MARKER_TIME: number = 600000;

    public CIRCLE_COLOR_OPACITY: number = 0.3;
    public CIRCLE_BORDER_OPACITY: number = 0.6;
    public USER_COLOR_OPACITY: number = 0.5;

    public UESR_BOUNDARY_COLOR: string = '#3337AA';
    public USER_BOUNDARY_BORDER: string = '#4953ed';
    public USER_CIRCLE_COLOR: string = '#e26a6a';
    public USER_CIRCLE_BORDER: string = '#B53535';
    public USER_CIRCLE_STROKEOPACITY: number = 2;

    public OTHER_CIRCLE_COLOR: string = '#4c85f7';
    public OTHER_CIRCLE_BORDER: string = '#0048ff';

    public SESSION_TIMEOUT_END_TIME: number = 100;
    public SESSION_TIMEOUT_INTERVAL: number = 3000; // Interval set to 3 seconds
}
