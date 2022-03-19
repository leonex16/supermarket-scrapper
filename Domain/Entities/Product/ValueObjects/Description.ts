import { EmptyValueException, RequiredParamException, StrTooLargeException } from '../../../Common/Exceptions';
// import { EmptyValueException, RequiredParamException, StrTooLargeException } from '@Common/Exceptions';

interface DescriptionParams {
  description: string
}

export class Description {
  private readonly _value: string;

  private constructor( { description }: DescriptionParams ) {
    this._value = description;
  }

  get value() {
    return this._value;
  }

  static create ( { description }: DescriptionParams ) {
    const descriptionTrimmed = description?.trim();

    if ( descriptionTrimmed === undefined ) throw new RequiredParamException();
    if ( descriptionTrimmed === '' ) throw new EmptyValueException();
    if ( descriptionTrimmed.length > 50 ) throw new StrTooLargeException();
            
    return new Description( { description: descriptionTrimmed } );
  }
}