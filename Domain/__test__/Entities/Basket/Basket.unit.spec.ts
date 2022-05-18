import { Basket } from '@Domain/Entities/Basket/Basket';

const basketParams: any = {
  items: [],
};

describe( 'Basket should...', () => {
  it( 'can create an instance', () => {
    const basket = Basket.create( basketParams );
    expect( basket ).toBeInstanceOf( Basket );
  } );

  it( 'get data from basket', () => {
    const basket = Basket.create( basketParams );
    expect( basket.id ).toBeUndefined();
    expect( basket.items ).toHaveLength( 0 );
  } );
} );
