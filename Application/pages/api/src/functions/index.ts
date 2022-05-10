/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ConsoleKeys } from '@server/types/index';
import { NODE_ENV } from '@server/config/index';

export const logger = ( type: ConsoleKeys, ...args: any[] ) => {
  if ( NODE_ENV !== 'development' ) return;

  // eslint-disable-next-line no-console
  const clgFn = console[ type ];

  if ( clgFn === undefined ) {
    console.info( '>>> [logger] Type console error' );
    return;
  }

  // const datetime = new Intl.DateTimeFormat('en-US',{ dateStyle: 'medium', timeStyle: 'medium', timeZone: 'UTC',  }).format();
  const separator = ( quant = 40 ) => '*'.repeat( quant );
  const sepTop = `${ separator() } ${ type.toUpperCase() } ${ separator() }`;
  const sepBottom = `${ separator() }*${ separator( type.length ) }*${ separator() }`;

  clgFn( sepTop );
  clgFn( `[ ${new Date().toISOString()} ] `, ...args );
  clgFn( sepBottom );
};

export const toCapitalizeCase = ( str?: string ) => {
  if ( str === undefined ) {
    logger( 'warn', 'toCapitalizeCase >>> String argument is required' );
    return '';
  }
  return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
};

export const formatToCLPCurrency = ( value?: number | string ) => {
  const isUndefined = value === undefined;
  const isNotNumber = Number.isInteger( Number( value ) ) === false;

  if ( isUndefined || isNotNumber ) {
    logger( 'warn', 'formatToCLPCurrency >>> Value argument is required' );
    return '$0';
  }

  const parsedValue = typeof value === 'string' ? Number( value ) : value;
  return new Intl.NumberFormat( 'es-CL', { style: 'currency', currency: 'CLP' } ).format( parsedValue! );
};

export const sanitizedCLPCurrency = ( value?: string ) => {
  const isUndefined = value === undefined;
  const isNotNumber = Number.isInteger( Number( value ) ) === false;

  if ( isUndefined || isNotNumber ) {
    logger( 'warn', 'sanitizedCLPCurrency >>> Value argument is required' );
    return 0;
  }
  const parsedValue = value!.replace( /[^0-9]/g, '' );
  return parsedValue;
};

export const satizeAndFormatCLPCurrency = ( value?: string ) => formatToCLPCurrency( sanitizedCLPCurrency( value ) );

export const removeQueryString = ( url: string ) => {
  const urlWithoutQueryString = url.split( '?' )[ 0 ];
  return urlWithoutQueryString.trim();
};
