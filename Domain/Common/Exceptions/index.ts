export class EmptyValueException extends Error {
  constructor( customMessage?: string ) {
    customMessage ??= 'Valor vacío';

    super( customMessage );
    this.name = 'EmptyValueException';
  }
}

export class RequiredParamException extends Error {
  constructor( customMessage?: string ) {
    customMessage ??= 'Valor requerido';

    super( customMessage );
    this.name = 'RequiredParamException';
  }
}

export class StrTooLargeException extends Error {
  constructor( customMessage?: string ) {
    customMessage ??= 'Longitud de cadena demasiado larga';

    super( customMessage );
    this.name = 'StrTooLargeException';
  }
}

export class StrTooShortException extends Error {
  constructor( customMessage?: string ) {
    customMessage ??= 'Longitud de cadena demasiado corta';

    super( customMessage );
    this.name = 'StrTooShortException';
  }
}

export class UrlNotValidException extends Error {
  constructor( customMessage?: string ) {
    customMessage ??= 'URL no válida';

    super( customMessage );
    this.name = 'UrlNotValidException';
  }
}