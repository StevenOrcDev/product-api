import { Request, Response, NextFunction } from 'express';
import { validateDto } from '../validateDto';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { formatErrors, getSourceDataFromRequest } from '../../utils';
import { SourceRequestDtoType } from '../../entities';

jest.mock('class-transformer', () => ({
  plainToInstance: jest.fn(),
}));

jest.mock('class-validator', () => ({
  validate: jest.fn(),
}));

jest.mock('../../utils', () => ({
  formatErrors: jest.fn(),
  getSourceDataFromRequest: jest.fn(),
}));

describe('validateDto middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockResponse = {
      status: mockStatus,
    };
    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  it('should call next() if DTO is valid and default source (BODY) is used', async () => {
    const mockDtoClass = jest.fn();
    const mockData = { field: 'value' };

    (getSourceDataFromRequest as jest.Mock).mockReturnValue(mockData);
    (plainToInstance as jest.Mock).mockReturnValue(mockData);
    (validate as jest.Mock).mockResolvedValue([]);

    const middleware = validateDto(mockDtoClass);

    await middleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(getSourceDataFromRequest).toHaveBeenCalledWith(mockRequest, SourceRequestDtoType.BODY);
    expect(plainToInstance).toHaveBeenCalledWith(mockDtoClass, mockData);
    expect(validate).toHaveBeenCalledWith(mockData);
    expect(mockNext).toHaveBeenCalled();
    expect(mockStatus).not.toHaveBeenCalled();
  });

  it('should return 400 with formatted errors if DTO is invalid', async () => {
    const mockDtoClass = jest.fn();
    const mockData = { field: 'invalid value' };
    const mockValidationErrors: ValidationError[] = [
      { property: 'field', constraints: { isString: 'field must be a string' } } as ValidationError,
    ];

    (getSourceDataFromRequest as jest.Mock).mockReturnValue(mockData);
    (plainToInstance as jest.Mock).mockReturnValue(mockData);
    (validate as jest.Mock).mockResolvedValue(mockValidationErrors);
    (formatErrors as jest.Mock).mockReturnValue([{ field: 'field', error: 'field must be a string' }]);

    const middleware = validateDto(mockDtoClass, SourceRequestDtoType.BODY);

    await middleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(getSourceDataFromRequest).toHaveBeenCalledWith(mockRequest, SourceRequestDtoType.BODY);
    expect(plainToInstance).toHaveBeenCalledWith(mockDtoClass, mockData);
    expect(validate).toHaveBeenCalledWith(mockData);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      errors: [{ field: 'field', error: 'field must be a string' }],
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
