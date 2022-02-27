export class StrTooLarge extends Error {
    constructor ( message = 'Longitud de cadena demasiado larga') {
        super( message );
        this.name = "StrTooLarge"
    }
}