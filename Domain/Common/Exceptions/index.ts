import { CustomErrorProps } from '@Domain/Common/Types';

export class EmptyValueException extends Error {
  
  constructor ( customErrorProps?: CustomErrorProps ) {
    const message = 'Valor vacío';

    super(
      customErrorProps?.customMessage ?? message
      // customErrorProps?.opts
    );
    this.name = 'EmptyValue';
  }
}

export class RequiredParamException extends Error {
  constructor ( customErrorProps?: CustomErrorProps ) {
    const message = 'Valor requerido';

    super(
      customErrorProps?.customMessage ?? message
      // customErrorProps?.opts
    );
    this.name = 'RequiredParam';
  }
}

export class StrTooLargeException extends Error {
  constructor ( customErrorProps?: CustomErrorProps ) {
    const message = 'Longitud de cadena demasiado larga';

    super(
      customErrorProps?.customMessage ?? message
      // customErrorProps?.opts
    );
    this.name = 'StrTooLarge';
  }
}

export class StrTooShortException extends Error {
  constructor ( customErrorProps?: CustomErrorProps ) {
    const message = 'Longitud de cadena demasiado corta';

    super(
      customErrorProps?.customMessage ?? message
      // customErrorProps?.opts
    );
    this.name = 'StrTooShort';
  }
}

export class UrlNotValidException extends Error {
  constructor ( customErrorProps?: CustomErrorProps ) {
    const message = 'URL no válida';

    super(
      customErrorProps?.customMessage ?? message
      // customErrorProps?.opts
    );
    this.name = 'UrlNotValid';
  }
}