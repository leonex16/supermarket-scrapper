export class EmptyValueException extends Error {
  constructor( paramName: string, customMessage?: string ) {
    customMessage ??= `The ${ paramName } value can not be empty`;

    super( customMessage );
    this.name = 'EmptyValueException';
  }
}

export class RequiredParamException extends Error {
  constructor( paramName: string, customMessage?: string ) {
    customMessage ??= `The ${ paramName } value is required`;

    super( customMessage );
    this.name = 'RequiredParamException';
  }
}

export class StrTooLargeException extends Error {
  constructor( paramName: string, customMessage?: string ) {
    customMessage ??= `The ${ paramName } value is too large`;

    super( customMessage );
    this.name = 'StrTooLargeException';
  }
}

export class StrTooShortException extends Error {
  constructor( paramName: string, customMessage?: string ) {
    customMessage ??= `The ${ paramName } value is too short`;

    super( customMessage );
    this.name = 'StrTooShortException';
  }
}

export class UrlNotValidException extends Error {
  constructor( paramName: string, customMessage?: string ) {
    customMessage ??= `The ${ paramName } value is not valid`;

    super( customMessage );
    this.name = 'UrlNotValidException';
  }
}

export class MethodNotExecutedException extends Error {
  constructor( methodName?: string, customMessage?: string ) {
    customMessage ??= `The ${ methodName } method was not executed`;

    super( customMessage );
    this.name = 'MethodNotExecutedException';
  }
}

export class NotFoundException extends Error {
  constructor( value?: string, customMessage?: string ) {
    customMessage ??= `The ${ value } not found`;

    super( customMessage );
    this.name = 'NotFoundException';
  }
}