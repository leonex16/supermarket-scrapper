const path = require( "path" );

module.exports = {
  webpack: {
    alias: {
      '@Pages': path.resolve( __dirname, "src/pages/" ),
    }
  }
}