import { SourceRequestDtoType } from '../entities';
import { Request } from 'express';
import { getSourceDataFromRequest } from './getSourceDataFromRequest';

describe('getSourceDataFromRequest', () => {
  const mockRequest: Partial<Request> = {
    body: { key: 'value from body' },
    query: { key: 'value from query' },
    params: { key: 'value from params' },
  };
  it('should return body when source is BODY', () => {
    const result = getSourceDataFromRequest(mockRequest as Request, SourceRequestDtoType.BODY);
    expect(result).toEqual({ key: 'value from body' });
  });

  it('should return query when source is QUERY', () => {
    const result = getSourceDataFromRequest(mockRequest as Request, SourceRequestDtoType.QUERY);
    expect(result).toEqual({ key: 'value from query' });
  });

  it('should return params when source is PARAMS', () => {
    const result = getSourceDataFromRequest(mockRequest as Request, SourceRequestDtoType.PARAMS);
    expect(result).toEqual({ key: 'value from params' });
  });
});
