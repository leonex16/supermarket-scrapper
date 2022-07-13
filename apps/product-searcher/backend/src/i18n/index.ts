const LANGUAJE_DEFAULT = 'EN';

export const I18N = {
  ES: {
    EXCEPTIONS: {
      SUPERMARKET_VALUE_NOT_VALID: 'El campo supermercado debe ser Lider o Jumbo',
      PRODUCT_NAME_VALUE_NOT_VALID: 'El campo nombre debe no puede estar vacio',
      ARGUMENT_REQUIRED: 'es necesario como argumento',
      PRODUCT_NOT_FOUND: 'No se encontro el producto'
    },
    STATUS_CODES: {
      500: 'Hubo un error en el servidor',
      404: 'No se encontro el recurso',
      400: 'Entrada de datos no es correcta',
      204: '',
      200: 'Ok'
    }
  },
  EN: {
    EXCEPTIONS: {
      SUPERMARKET_VALUE_NOT_VALID: 'Supermarket value just to be Lider or Jumbo',
      PRODUCT_NAME_VALUE_NOT_VALID: 'Product name can not to be empty',
      ARGUMENT_REQUIRED: 'argument required',
      PRODUCT_NOT_FOUND: 'Product not found'
    },
    STATUS_CODES: {
      500: 'Error on the server',
      404: 'Resource not found',
      400: 'Data input is not correct',
      204: '',
      200: 'Ok'
    }
  }
}[ LANGUAJE_DEFAULT ];

export type Exceptions = keyof typeof I18N.EXCEPTIONS;
export type StatusCodes = keyof typeof I18N.STATUS_CODES;
