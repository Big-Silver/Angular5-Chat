import {Component, OnChanges, Input, SimpleChange} from '@angular/core';

@Component({
    selector: 'password-strength-bar',
        styles: [`
    ul#strengthBar {
        display:inline;
        list-style:none;
        margin:0;
        margin-left:15px;
        padding:0;
        vertical-align:2px;
    }
    .point:last {
        margin:0 !important;
    }
    .point {
        background:#DDD;
        border-radius:2px;
        display:inline-block;
        height:5px;
        margin-right:1px;
        width:20px;
    }`],
    template: `
    <div id="strength" #strength>
        <small>{{barLabel}}</small>
        <ul id="strengthBar">
            <li class="point" [style.background-color]="bar0"></li><li class="point" [style.background-color]="bar1"></li><li class="point" [style.background-color]="bar2"></li><li class="point" [style.background-color]="bar3"></li><li class="point" [style.background-color]="bar4"></li>
        </ul>
    </div>
`
})
export class PasswordStrengthBar implements OnChanges {
    @Input() passwordToCheck: string;
    @Input() barLabel: string;
    bar0: string;
    bar1: string;
    bar2: string;
    bar3: string;
    bar4: string;

    private colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

    private static measureStrength(p) {
        var _force = 0;
        var _regex = /[$-/:-?{-~!"^_`\[\]]/g; // "

        var _lowerLetters = /[a-z]+/.test(p);
        var _upperLetters = /[A-Z]+/.test(p);
        var _numbers = /[0-9]+/.test(p);
        var _symbols = _regex.test(p);

        var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];

        var _passedMatches = 0;
        for (let _flag of _flags) {
            _passedMatches += _flag === true ? 1 : 0;
        }

        _force = _passedMatches*10;
        if (p.length >= 6)
            _force += 10;

        return _force;

    }
    private getColor(s) {
        var idx = 0;
        if (s <= 10) {
            idx = 0;
        }
        else if (s <= 20) {
            idx = 1;
        }
        else if (s <= 30) {
            idx = 2;
        }
        else if (s <= 40) {
            idx = 3;
        }
        else {
            idx = 4;
        }
        return {
            idx: idx + 1,
            col: this.colors[idx]
        };
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        var password = changes['passwordToCheck'].currentValue;
        this.setBarColors(5, '#DDD');
        if (password) {
            let c = this.getColor(PasswordStrengthBar.measureStrength(password));
            this.setBarColors(c.idx, c.col);
        }
    }
    private setBarColors(count, col) {
        for (let _n = 0; _n < count; _n++) {
            this['bar' + _n] = col;
        }
    }
}