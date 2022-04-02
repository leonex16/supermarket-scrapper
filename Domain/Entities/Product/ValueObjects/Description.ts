import { StrTooLargeException } from '@Domain/Common/Exceptions';

interface DescriptionParams {
  description?: string
}

export class Description {
  private readonly _value: string | null;

  private constructor( { description = '' }: DescriptionParams ) {
    this._value = description === '' ? null : description;
  }

  get value() {
    return this._value;
  }

  static create( { description = '' }: DescriptionParams ) {
    const descriptionTrimmed = description?.trim();

    if ( descriptionTrimmed.length > 50 ) throw new StrTooLargeException( 'description' );
            
    return new Description( { description: descriptionTrimmed } );
  }
}