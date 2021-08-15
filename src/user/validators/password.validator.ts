import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'PasswordRequiredChars', async: false })
export class IsPasswordRequireCharsConstraint implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    return /(?=.*?[A-Z])(?=.*?[0-9])/gm.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return 'The password must contain atleast one uppercase letter and one number';
  }
}

import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPasswordRequireChars(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordRequireCharsConstraint,
    });
  };
}