export class SupermarketDoesNotSupport extends Error {
  constructor ( supermarketName: string ) {
    super( `${ supermarketName } supermarket does not support yet` );
  }
}
