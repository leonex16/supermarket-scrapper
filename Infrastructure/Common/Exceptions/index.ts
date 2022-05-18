export class NotFoundException extends Error {
  constructor( customMessage?: string ) {
    customMessage = customMessage ?? 'Recurso no encontrado';

    super( customMessage );
    this.name = 'NotFoundException';
  }
}
