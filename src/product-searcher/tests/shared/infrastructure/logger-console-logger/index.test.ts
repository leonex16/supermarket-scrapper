import { expect, test } from '@playwright/test';

import { LoggerConsole } from '../../../../shared/infrastructure/logger-console-logger';

test.describe( 'LoggerConsole', () => {
  test( 'should call log method without fail', () => {
    const logger = new LoggerConsole();

    expect( () => logger.log() ).not.toThrowError();
  } );
} );
