import { defineConfig } from 'drizzle-kit'

// With this configuration, Drizzle will read from the schema.ts file and 
// use this information during the migration generation process.
export default defineConfig({
  schema: ['./src/worker/db/schema.ts'],
  out: './migrations',
  dialect: 'sqlite',
  strict: true,
  verbose: true,
})