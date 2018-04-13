import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ValidationService} from '../../../services/validation/validation.service';


@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})

export class ErrorMessageComponent {

  @Input() controlName: string;
  @Input() control: FormControl;

  constructor() {

  }

  get errorMessage() {
    if (this.control && this.control.errors) {
      for (const prop in this.control.errors) {
        if (this.control.errors.hasOwnProperty(prop)) {
          return ValidationService.getValidatorErrorMessage(prop);
        }
      }
    }
    return null;
  }
}
