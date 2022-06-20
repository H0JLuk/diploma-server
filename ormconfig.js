module.exports = [
  {
    name: 'main',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['src/**/*entity.ts'],
    migrations: ['src/migrations/**/*.ts'],
    logging: true,
    cli: {
      entitiesDir: 'src',
      migrationsDir: 'src/migrations',
    },
    options: { trustServerCertificate: true },
  },
  {
    name: 'seed',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['src/**/*entity.ts'],
    migrations: ['src/seeds/*.ts'],
    logging: true,
    cli: {
      migrationsDir: 'src/seeds',
    },
  },
];
