export class NotFoundProductException extends Error {
  constructor ( productName: string ) {
    super( `Product ${ productName } not found` );
  }
}
