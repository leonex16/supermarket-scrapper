import { ClgType } from '#src/types/index';
import { NODE_ENV } from '#src/config/index';

export const logger = ( type: ClgType, ...args: any[] ) => {
  if ( NODE_ENV !== 'DEVELOPMENT' ) return;

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
