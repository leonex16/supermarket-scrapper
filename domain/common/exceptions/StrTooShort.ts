export class StrTooShort extends Error {
  constructor ( message = 'Longitud de cadena demasiado corta' ) {
    super( message );
    this.name = "StrTooShort";
  }
}