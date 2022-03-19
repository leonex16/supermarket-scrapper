export const findByIdAndRemove = <T>( items: T[], itemIdToDelete: string ): T[] => {
  const copy = [ ...items ] as any[];

  for( let i = 0; i < copy.length; i++ ) {
    if( copy[ i ][ itemIdToDelete ] === itemIdToDelete ) {
      copy.splice( i, 1 );
      break;
    }
  }

  return copy as T[];
};

export const logException = ( filename: string, ...args: any[] ) => {
  const separator = '*'.repeat( 20 );

  global.console.info( `\n${ separator } ${ filename } ${ separator }\n` );
  global.console.error( ...args );
  global.console.info( `\n${ separator } ${ filename } ${ separator }\n` );
};