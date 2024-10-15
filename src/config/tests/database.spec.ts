describe('AppDataSource', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('should configure the DataSource with environment variables', async () => {
    const { AppDataSource } = await import('../database');
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

  it('should use the default host when DB_HOST is not defined', async () => {
    delete process.env.DB_HOST;
    delete process.env.DB_PORT;

    const { AppDataSource } = await import('../database');
    const dataSourceOptions = AppDataSource.options;

    expect(dataSourceOptions['host']).toBe('localhost');
    expect(dataSourceOptions['port']).toBe(5432);
  });

  it('should use the default host when NODE_ENV is not test', async () => {
    process.env.NODE_ENV = 'development';

    const { AppDataSource } = await import('../database');
    const dataSourceOptions = AppDataSource.options;

    expect(dataSourceOptions['host']).toBe('localhost');
    expect(dataSourceOptions['port']).toBe(5432);
  });

  it('should use set correct values when NODE_IS production', async () => {
    process.env.NODE_ENV = 'production';
    process.env.DATABASE_URL = 'url';

    const { AppDataSource } = await import('../database');
    const dataSourceOptions = AppDataSource.options;

    expect(dataSourceOptions['host']).toBe(undefined);
    expect(dataSourceOptions['port']).toBe(undefined);
    expect(dataSourceOptions['username']).toBe(undefined);
    expect(dataSourceOptions['password']).toBe(undefined);
    expect(dataSourceOptions['database']).toBe(undefined);
    expect(dataSourceOptions['url']).toBe('url');
  });
});
