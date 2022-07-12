export class RequestHttp {
  constructor (
    private API_URL = ''
  ) {}

  async get<T = unknown> ( path: string ) {
    const response = await fetch( `${ this.API_URL }${ path }` );
    const json = await response.json();

    return this.buildResponse<T>( json );
  }

  private buildResponse<T> ( json: any ) {
    return {
      isOk: json.isOk as boolean,
      message: json.message as string,
      data: json.data as T
    };
  }
}
