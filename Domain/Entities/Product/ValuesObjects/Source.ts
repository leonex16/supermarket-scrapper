interface SourceParams {
  source: string;
}

export class Source {
  private _source: string;

  private constructor({source}: SourceParams) {
    this._source = source;
  }

  get Url() {
    return this._source
  }

  static create({source}: SourceParams) {
    let returnedValue = null;

    try {
      // TODO: Validate...
      returnedValue = new Source({source});
    } catch (error) {
      console.error(error);
    }

    return returnedValue;
  }
}