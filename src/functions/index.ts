import { ENV } from '#src/config/index';

type clgType = 'info' | 'log' | 'warn' | 'error';

export const logger = ( type: clgType, ...args: any[] ) => {
  if ( ENV !== 'DEVELOPMENT' ) return;

  // eslint-disable-next-line no-console
  const clgFn = console[ type ];

  if ( clgFn === undefined ) {
    console.info( '>>> [logger] Type console error' );
    return;
  }

  const separator = ( quant = 25 ) => '*'.repeat( quant );
  const sepTop = `${ separator() } ${ type.toUpperCase() } ${ separator() }`;
  const sepBottom = `${ separator() }*${ separator( type.length ) }*${ separator() }`;

  clgFn( sepTop );
  clgFn( ...args );
  clgFn( sepBottom );
};
