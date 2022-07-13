export class EmptyValueException extends Error {
  constructor ( paramName: string, customMessage?: string ) {
    customMessage = customMessage ?? `The ${ paramName } value can not be empty`;

    super( customMessage );
    this.name = 'EmptyValueException';
  }
}

export class StrTooLargeException extends Error {
  constructor ( paramName: string, customMessage?: string ) {
    customMessage = customMessage ?? `The ${ paramName } value is too large`;

    super( customMessage );
    this.name = 'StrTooLargeException';
  }
}

export class StrTooShortException extends Error {
  constructor ( paramName: string, customMessage?: string ) {
    customMessage = customMessage ?? `The ${ paramName } value is too short`;

    super( customMessage );
    this.name = 'StrTooShortException';
  }
}

export class UrlNotValidException extends Error {
  constructor ( paramName: string, customMessage?: string ) {
    customMessage = customMessage ?? `The ${ paramName } value is not valid`;

    super( customMessage );
    this.name = 'UrlNotValidException';
  }
}
