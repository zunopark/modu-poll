import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/app/**/schema.ts',
  out: './src/app/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});