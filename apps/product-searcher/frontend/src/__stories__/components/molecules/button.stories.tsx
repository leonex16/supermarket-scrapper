/* eslint-disable no-alert */
import React from 'react';

import { Button, ButtonColor } from '../../../components/molecules/button';

export function Buttons () {
  return (
    <>
      <section>
        <header>
          <h2>Primary</h2>
        </header>
        <div>
          <Button
            color={ButtonColor.Primary}
            onClick={() => window.alert( 'Clicked on me!' )}
            text='Button Text'
          ></Button>
        </div>
      </section>
      <hr />
    </>
  );
}
