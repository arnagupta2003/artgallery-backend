import { bootstrap, runMigrations } from '@vendure/core';
import { config } from './vendure-config';

async function startVendure() {
  try {
    await runMigrations(config);
    await bootstrap(config);
  } catch (err) {
    console.error('Error during Vendure startup:', err);
    console.error(err);
    process.exit(1);
  }
}

startVendure();
