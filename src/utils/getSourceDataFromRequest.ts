import { SourceRequestDtoType } from '../entities';
import { Request } from 'express';

export function getSourceDataFromRequest(request: Request, source: SourceRequestDtoType) {
  if (source === SourceRequestDtoType.BODY) {
    return request.body;
  } else if (source === SourceRequestDtoType.QUERY) {
    return request.query;
  } else if (source === SourceRequestDtoType.PARAMS) {
    return request.params;
  }
}
