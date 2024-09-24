import { DataSource } from 'typeorm';

describe('AppDataSource', () => {
  let AppDataSource: DataSource;
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('should configure the DataSource with environment variables', () => {
    AppDataSource = require('../database').AppDataSource;
    const dataSourceOptions = AppDataSource.options;

    expect(dataSourceOptions.type).toEqual('postgres');
    expect(dataSourceOptions.database).toBe('testdb');
    expect(dataSourceOptions['username']).toBe('testuser');
    expect(dataSourceOptions['password']).toBe('testpassword');
    expect(dataSourceOptions.entities).toEqual(expect.arrayContaining([expect.any(Function)])); // Vérifie que les entités sont définies
    expect(dataSourceOptions.synchronize).toBe(true);
    expect(dataSourceOptions.logging).toBe(false);
    expect(dataSourceOptions['host']).toBe('localhost');
    expect(dataSourceOptions['port']).toBe(5432);
  });

  it('should use the default host when DB_HOST is not defined', () => {
    delete process.env.DB_HOST;
    delete process.env.DB_PORT;

    AppDataSource = require('../database').AppDataSource;
    const dataSourceOptions = AppDataSource.options;

    expect(dataSourceOptions['host']).toBe('localhost');
    expect(dataSourceOptions['port']).toBe(5432);
  });

  it('should use the default host when NODE_ENV is not test', () => {
    process.env.NODE_ENV = 'development';

    AppDataSource = require('../database').AppDataSource;
    const dataSourceOptions = AppDataSource.options;

    expect(dataSourceOptions['host']).toBe('localhost');
    expect(dataSourceOptions['port']).toBe(5432);
  });
});
