const path = require( "path" );

module.exports = {
  webpack: {
    alias: {
      '@Pages': path.resolve( __dirname, "src/pages/" ),
      '@Assets': path.resolve( __dirname, "src/assets/" ),
      '@Components': path.resolve( __dirname, "src/components/" ),
    }
  }
}