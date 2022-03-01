import { StrTooLarge } from "@Common/exceptions/StrTooLarge"

export class Description {
    private _value: string;

    private constructor( description: string ) {
        this._value = description;
    }

    get value() {
        return this._value;
    }

    static create ( description: string ) {
        let returnedValue = null;

        try {

            //Validate blank description
            if ( description === "") {

                if ( description.length > 50 ) throw new StrTooLarge;
                
                returnedValue = new Description( description );
            }
            
        } catch ( error ) {
            console.error( error );
        }

        return returnedValue;
    }
}