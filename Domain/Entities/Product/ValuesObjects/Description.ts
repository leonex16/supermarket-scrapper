import { StrTooLarge } from "@Common/Exceptions/StrTooLarge"

interface DescriptionParams {
    description: string
}
export class Description {
    private _value: string;

    private constructor( {description}: DescriptionParams ) {
        this._value = description;
    }

    get value() {
        return this._value;
    }

    static create ( {description}: DescriptionParams ) {
        let returnedValue = null;

        try {

            // TODO: Validate empty description
            if ( description === "") {}
            
            if ( description.length > 50 ) throw new StrTooLarge;
            
            returnedValue = new Description( {description} );
            
        } catch ( error ) {
            console.error( error );
        }

        return returnedValue;
    }
}