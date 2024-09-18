import { ValidationError } from 'class-validator';
import { FormattedError } from './types';

export const formatErrors = (errors: ValidationError[]): FormattedError[] => {
  return errors?.map((err) => {
    return {
      property: err.property,
      constraints: err.constraints,
    };
  });
};
