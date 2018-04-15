export class ValidationService {

  static getValidatorErrorMessage(validatorName: string) {
    /* tslint:disable:max-line-length */
    const config = {
        'allCharsTheSame': 'All the alphanumeric characters cannot be the same',
        'dateInFuture': 'Date cannot be in the future',
        'decimalsMin': 'Value must be greater than 0.00',
        'decimalsOnly': 'This can only contain decimal numbers',
        'expectedSpendRequired': 'Please select a spend range',
        'industryCodeRequired': 'Please select an industry',
        'invalidAccountAliasChars': 'Account alias can only have alphanumeric characters, spaces, hyphens (-) and underscores (_)',
        'invalidAccountNumberLength': 'Account number must be 8 digits in length',
        'invalidAddressChars': 'Address fields should contain only letters, numbers, full stops, dashes, commas, spaces, apostrophes, slashes, brackets',
        'invalidAllBlankSpaces': 'Must not contain ALL spaces',
        'invalidAssociateName': 'Name should only contain letters, dashes and apostrophes',
        'invalidBenNameChars': 'Beneficiary name can only have a-z, A-Z, 0-9, spaces, ampersand (&), hyphen (-), full stop (.), solidus (/) characters',
        'invalidCustomerName': 'Unaccepted character entered in Business name',
        'invalidCustomerNameLetters': 'Business name can’t be made up of only special characters or numbers',
        'invalidDate': 'Date is invalid',
        'invalidEmailAddress': 'Please check the email address',
        'invalidEmailMultipleAddress': 'Email address format not recognised – only use commas between separate email addresses.',
        'duplicatesEmailAddress': 'Some email addresses are the same, please remove any duplicates.',
        'invalidPhoneNumber': 'Please check the phone number',
        'invalidPostTownChars': 'Posttown should contain only letters, numbers, dashes, spaces, apostrophes, dots',
        'invalidRefChars': 'Reference can only have a-z, A-Z, 0-9, spaces, ampersand (&), hyphen (-), full stop (.), solidus (/) characters',
        'invalidRefMinLengthError': 'Reference must contain at least 6 letters or numbers',
        'invalidSortCode': 'Sort code invalid, must in format of XX-XX-XX',
        'invalidUKPostCode': 'Please check the postcode',
        'maxlength': 'This field has maximum length',
        'minlength': 'This field has minimum length',
        'moneyValidator': 'Don\'t use commas to separate thousands etc, and use just two decimal places (.00)',
        'numbersAndSpecialCharacters': 'Please use numbers and specials characters',
        'numbersOnly': 'This can only contain numbers',
        'ownershipError': '% of ownership cannot be below 1% or above 100%',
        'percentRange': 'Percent cannot be below 1% or above 100%',
        'required': 'This field is required',
        'requiredAmount': 'Please enter an amount',
        'requiredPeriodSelect': 'Please select a period',
        'requiredMultipleMails': 'Please enter one or more email address',
        'upperAndLowerCase': 'Please use uppercase and lowercase letters',
        'changePassword': 'Unaccepted character entered in changepassowrd',        
    };
    return config[validatorName];
  }

  static requiredAmount(control) {
    const str = String(control.value);
    if (str === '0.0' || str === '0') {
        return null;
    }
    if (control.value) {
        return null;
    } else {
        return {'requiredAmount': true};
    }
  }

    static requiredPeriodSelect(control) {
        return (control.value ? null : {
            'requiredPeriodSelect': true
        });
    }

    static requiredMultipleMails(control) {
        if (control.value) {
            return null;
        } else {
            return {'requiredMultipleMails': true};
        }
    }

    static beneficiaryNameValidator(control) {

        const value = control.value;
        let error;

        if (value) {
            if (value.match(/^[ A-Za-z0-9.\/\&-]*$/)) {
                if (value.match(/^\s*$/)) {
                    error = {'invalidAllBlankSpaces': true};
                } else {
                    return null;
                }
            } else {
                error = {'invalidBenNameChars': true};
            }
        }

        return error;
    }

    static allBlankSpaces(control) {

        if (control.value) {
            if (control.value.match(/^\s*$/)) {
                return {'invalidAllBlankSpaces': true};
            } else {
                return null;
            }
        }
    }

    static referenceValidator(control) {

        const value = control.value;
        let error;

        if (value) {
            if (value.match(/^[ A-Za-z0-9\/\.\&\-]*$/)) {

                const str = value.replace(/\W/g, '');

                if (str.length > 5) {
                    if (str.match(/^(.)\1*$/)) {
                        error = {'allCharsTheSame': true};
                    } else {
                        return null;
                    }
                } else {
                    error = {'invalidRefMinLengthError': true};
                }
            } else {
                error = {'invalidRefChars': true};
            }
        }

        return error;
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        // if (control.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/g)) {
        if (control.value) {
            if (control.value.match(/[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/)) {
                return null;
            } else {
                return {'invalidEmailAddress': true};
            }
        }
    }


    static emailMultipleValidator(control) {
        let error: boolean;
        if (control && control.value) {
        const array = control.value.split(',').map(function (item) {
            return item.trim();
        });
        array.forEach(email => {
            const arrayWhiteSpaces = email.split(' ').map(function (item) {
            if (item = '') {
                error = true;
            }
            return item.trim();
            });
            if (arrayWhiteSpaces.length > 1) {
                error = true;
            }
            if (!email.match(/[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/)) {
                error = true;
            }
        });

        if (error) {
            return {'invalidEmailMultipleAddress': true};
        } else {
        }

        return null;
        }
    }

  static emailDuplicatesValidator(control) {
    let error: boolean;
    if (control && control.value) {
      const array = control.value.split(',').map(function (item) {
        return item.trim();
      });
      array.forEach(email => {
        const cont = array.join('').split(email).length - 1;
        if (cont > 1) {
          error = true;
        }
      });

      if (error) {
        return {'duplicatesEmailAddress': true};
      } else {
      }

      return null;
    }
  }

  static ukPostCodeValidator(control) {
    if (control.value) {
      if (control.value.match(/^[a-zA-Z]{1,2}[0-9R][0-9a-zA-Z]? ?[0-9][a-zA-Z[cikmovCIKMOV]{2}$/)) {
        return null;
      } else {
        return {'invalidUKPostCode': true};
      }
    }
  }

  static phoneValidator(control) {
    if (control.value) {
      if (control.value.match(/^(?=.*(\d.*){11,})^[\d+(]{1}[\d][)(\d\s]{0,10}[\d\s]{3,15}$/g)) {
        return null;
      } else {
        return {'invalidPhoneNumber': true};
      }
    }
  }

  static ukPhoneValidator(control) {
    if (control.value) {
      if (control.value.slice(0, 2) === '07') {
        return null;
      } else {
        return {'invalidUKPhone': true};
      }
    }
  }

  static digit4Validator(control) {
    if (control.value) {
      if (control.value.match(/(?=.*(\d.*){4,})^\d+/)) {
        return null;
      } else {
        return {'invalid4DigitCode': true};
      }
    }
  }

  static digit7Validator(control) {
    if (control.value) {
      if (control.value.match(/(?=.*(\d.*){7,})^\d+/)) {
        return null;
      } else {
        return {'invalid7DigitCode': true};
      }
    }
  }

  static addressCharsValidator(control) {
    if (control.value) {
      if (control.value.match(/^[ A-Za-z0-9.,'\/\&()-]*$/)) {
        return null;
      } else {
        return {'invalidAddressChars': true};
      }
    }
  }

  static addressPostTownCharsValidator(control) {
    if (control.value) {
      if (control.value.match(/^[ A-Za-z0-9-|.|-|'|&]*$/)) {
        return null;
      } else {
        return {'invalidPostTownChars': true};
      }
    }
  }

  static accountAliasValidator(control) {
    if (control.value) {
      if (control.value.match(/^[\w-\s]*$/)) {
        return null;
      } else {
        return {'invalidAccountAliasChars': true};
      }
    }
  }

  static customerNameValidatorSpecialCharacters(control) {
    if (control.value) {
      if (control.value.match(/^[ A-Za-z0-9.,'&@£$*=#%+‘’()\[\]\{}<>€¥!‘“”"?\\/«»_:;\-]*$/)) {
        return null;
      } else {
        return {'invalidCustomerName': true};
      }
    }
  }

  static customerNameValidatorSpecialCharacters6letters(control) {
    if (control.value) {
      if (control.value.length >= 6) {
        if (control.value.match(/^[ A-Za-z0-9.,'&@£$*=#%+‘’()\[\]\{}<>€¥!‘“”"?\\/«»_:;\-]*$/)) {
          return null;
        } else {
          return {'changePassword': true};
        }
      } else {
        return {'changePassword': true};
      }      
    }
  }

  static customerNameValidatorLetters(control) {
    if (control.value) {
      if (control.value.match(/^(?=.*[A-Za-z]).+$/)) {
        return null;
      } else {
        return {'invalidCustomerNameLetters': true};
      }
    }
  }

  static associateNameValidator(control) {
    if (control.value) {
      if (control.value.match(/^[ A-Za-z'-]*$/)) {
        return null;
      } else {
        return {'invalidAssociateName': true};
      }
    }
  }

  static ownershipValidator(control) {
    if (control.value) {
      if (control.value >= 1 && control.value <= 100) {
        return null;
      } else {
        return {'ownershipError': true};
      }
    }
  }

  static industryCodeRequired(control) {
    if (control.value) {
      return null;
    } else {
      return {'industryCodeRequired': true};
    }
  }

  static expectedSpendRequired(control) {
    if (control.value) {
      return null;
    } else {
      return {'expectedSpendRequired': true};
    }
  }

  static sortCodeValidator(control) {
    if (control.value) {
      if (control.value.match(/(\d{6}|(\d{2}-){2}\d{2})/)) {
        return null;
      } else {
        return {'invalidSortCode': true};
      }
    }
  }

  static IBANValidator(control) {
    if (control.value) {
      if (control.value.match(/([a-zA-Z]?(\d ?){2}[0-9]?(\d ?){2}[a-zA-Z0-9]?(\d ?){4}[0-9]?(\d ?){7}([a-zA-Z0-9]?){0,16}?(\d ?))/)) {
        return null;
      } else {
        return {'invalidIBAN': true};
      }
    }
  }

  static BICValidator(control) {
    if (control.value) {
      if (control.value.match(/[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?/)) {
        return null;
      } else {
        return {'invalidBIC': true};
      }
    }
  }

  static accountNumberValidator(control) {
    if (control.value) {
      if (String(control.value).length === 8) {
        return null;
      } else {
        return {'invalidAccountNumberLength': true};
      }
    }
  }

  static percentRangeValidator(control) {
    if (control.value) {
      if (control.value >= 1 && control.value <= 100) {
        return null;
      } else {
        return {'percentRange': true};
      }
    }
  }

  static numbersOnly(control) {
    const str = String(control.value);

    if (str) {
      if (str.match(/[^0-9]/g)) {
        return {'numbersOnly': true};
      } else {
        return null;
      }
    }
  }

  static decimalsOnly(control) {
    const str = String(control.value);

    if (str) {
      if (str.match(/^(?=.*\d)\d+(?:\.\d\d)?$/)) {
        return null;
      } else {
        return {'decimalsOnly': true};
      }
    }
  }

  static decimalsMin(control) {
    if (control.value) {
      const str = String(control.value);
      if (str && str !== '') {
        if (str.match(/^(?=.*\d)\d+(?:\.\d\d)?$/) && parseFloat(str) > 0.00) {
          return null;
        } else {
          return {'decimalsMin': true};
        }
      }
    }
  }


  static decimalsMinAmmount(control) {
    const str = String(control.value);

    if (str) {
      if (str.match(/^(?=.*\d)\d+(?:\.\d\d)?$/) && parseFloat(str) >= 0.00 || str === '0.0' || str === '0') {
        return null;
      } else {
        return {'decimalsMin': true};
      }
    }
  }

  static upperAndLowerCase(control) {
    const str = String(control.value);

    if (str) {
      if (str.match(/^(?=.*[a-z])(?=.*[A-Z]).+$/g)) {
        return null;
      } else {
        return {'upperAndLowerCase': true};
      }
    }
  }

  static numbersAndSpecialCharacters(control) {
    const str = String(control.value);

    if (str) {
      if (str.match(/^(?=.*\d).+$/g) || str.match(/^(?=.*(_|[^\w])).+$/g)) {
        return null;
      } else {
        return {'numbersAndSpecialCharacters': true};
      }
    }
  }

  static moneyValidator(control) {
    if (control.value) {
      const str = String(control.value);
      if (str && str !== '') {
        if (str.match(/^(\d{1,6}|\d{1,9}\.?\d{1,2})$/)) {
          return null;
        } else {
          return {'moneyValidator': true};
        }
      }
    }
  }

  static moneyValidatorWithZero(control) {
    const str = String(control.value);

    if (str) {
      if (str.match(/^(\d{1,6}|\d{1,9}\.?\d{1,2})$/)) {
        return null;
      } else {
        return {'moneyValidator': true};
      }
    }
  }
}
