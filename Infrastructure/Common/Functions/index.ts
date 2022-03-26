export const logException = ( filename: string, ...args: any[] ) => {
  const separator = '*'.repeat( 20 );

  global.console.info( `\n${ separator } ${ filename } ${ separator }\n` );
  global.console.error( ...args );
  global.console.info( `\n${ separator } ${ filename } ${ separator }\n` );
};
