// middlewares/validate-dto.ts
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { formatErrors, getSourceDataFromRequest } from '../utils';
import { SourceRequestDtoType } from '../entities';

export const validateDto = (dtoClass: any, source: SourceRequestDtoType = SourceRequestDtoType.BODY) => {
  // Cette ligne est exécutée lors du démarrage ou du redémarrage du serveur
  console.log('validateDto is called to setup the middleware');

  // return a middleware function that validates the request body against the DTO class
  // It is when a request is made to the server that req, res and next are passed to the middleware, they are injected by express
  return async (req: Request, res: Response, next: NextFunction) => {
    const dataSource = getSourceDataFromRequest(req, source);

    const dto = plainToInstance(dtoClass, dataSource);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const formattedErrors = formatErrors(errors);
      return res.status(400).json({ errors: formattedErrors });
    }

    next();
  };
};
