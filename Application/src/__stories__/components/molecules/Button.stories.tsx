import React from 'react';
import { Button, ButtonColor } from '@Application/src/components/molecules/Button';

export function Buttons() {
  return (
    <>
      <section>
        <header>
          <h2>Primary</h2>
        </header>
        <div>
          <Button color={ButtonColor.Primary} onClick={() => {}} text='Button Text'></Button>
        </div>
      </section>
      <hr />
    </>
  );
}