import { defineConfig } from '@prisma/client';

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/mydb'
    }
  }
});
