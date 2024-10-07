import { Request, Response } from 'express';
import { errorHandler } from '../errorHandler';

describe('errorHandler', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockStatus: jest.Mock;
  let mockSend: jest.Mock;
  let mockConsoleError: jest.SpyInstance;

  beforeEach(() => {
    mockRequest = {};
    mockSend = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ send: mockSend });
    mockResponse = {
      status: mockStatus,
    };

    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    mockConsoleError.mockRestore();
  });

  it('should return 500 status and generic message in production', () => {
    process.env.NODE_ENV = 'production';

    const error = new Error('Test error');
    errorHandler(error, mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith({
      message: 'Something went wrong!',
      error: undefined,
    });
    expect(mockConsoleError).toHaveBeenCalledWith(error.stack);
  });

  it('should return 500 status and detailed message in development', () => {
    process.env.NODE_ENV = 'development';

    const error = new Error('Test error');
    errorHandler(error, mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith({
      message: 'Something went wrong!',
      error: 'Test error',
    });
    expect(mockConsoleError).toHaveBeenCalledWith(error.stack);
  });
});
