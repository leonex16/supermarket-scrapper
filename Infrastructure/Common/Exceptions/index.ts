export class NotFoundException extends Error {
  constructor( customMessage?: string ) {
    customMessage ??= 'Recurso no encontrado';

    super( customMessage );
    this.name = 'NotFoundException';
  }
}
