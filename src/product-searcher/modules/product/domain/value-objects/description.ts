import { StrTooLargeException } from '../errors';

export class Description {
  private readonly _value: string | null;

  private constructor ( description: string ) {
    this._value = description || null;
  }

  get value () {
    return this._value;
  }

  static create ( description = '' ) {
    const descriptionTrimmed = description?.trim();

    if ( descriptionTrimmed.length > 50 ) throw new StrTooLargeException( 'description' );

    return new Description( descriptionTrimmed );
  }
}
