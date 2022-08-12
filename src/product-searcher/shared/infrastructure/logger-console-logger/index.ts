import { Logger } from '../../domain/logger';

export class LoggerConsole implements Logger {
  log ( ...args: unknown[] ): void {
    // if ( process.env.NODE_ENV !== 'development' ) return;

    const separator = ( quant = 40 ) => '*'.repeat( quant );
    const sepTop = `${ separator() } ${ 'LOG' } ${ separator() }`;
    const sepBottom = `${ separator() }*${ separator( 3 ) }*${ separator() }`;

    console.info( sepTop );
    console.info( `[ ${ new Date().toISOString() } ] `, ...args );
    console.info( sepBottom );
  }
}
