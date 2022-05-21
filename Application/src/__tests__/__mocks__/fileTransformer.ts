import path from 'path';

export = {
  process( _: any, sourcePath: string ) {
    return {
      code: `module.exports = ${ JSON.stringify( path.basename( sourcePath ) ) };`,
    };
  },
};
