import { AppDataSource } from '../database'; // Ajustez le chemin
import { initializeDB } from '../initializeDB'; // Ajustez le chemin

describe('initializeDB', () => {
  let exitSpy: jest.SpyInstance;
  const dataSource = jest.fn().mockImplementationOnce(() => {
    return {
      initialize: jest.fn(),
    };
  });

  beforeEach(() => {
    exitSpy = jest.spyOn(process, 'exit').mockImplementation((code: string | number | null | undefined) => {
      throw new Error(`process.exit called with code ${code}`);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    exitSpy.mockRestore();
  });

  it('should initialize the database successfully', async () => {
    jest.spyOn(AppDataSource, 'initialize').mockImplementationOnce(dataSource);

    await initializeDB();

    expect(AppDataSource.initialize).toHaveBeenCalledTimes(1);
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('should exit the process if database initialization fails', async () => {
    jest.spyOn(AppDataSource, 'initialize').mockRejectedValueOnce(new Error('Database connection error'));

    try {
      await initializeDB();
    } catch (e) {}

    expect(AppDataSource.initialize).toHaveBeenCalledTimes(1);
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
