import { ValidationError } from 'class-validator';
import { formatErrors } from '../formatDtoErrors'; // Adjust path as necessary
import { FormattedError } from '../types'; // Adjust path as necessary

describe('formatErrors', () => {
  it('should correctly format an array of ValidationError objects', () => {
    const validationErrors: ValidationError[] = [
      {
        property: 'username',
        constraints: {
          isNotEmpty: 'username should not be empty',
        },
        children: [],
        target: {},
      },
      {
        property: 'password',
        constraints: {
          isLength: 'password must be at least 6 characters',
        },
        children: [],
        target: {},
      },
    ];

    const formatted: FormattedError[] = formatErrors(validationErrors);

    expect(formatted).toEqual([
      {
        property: 'username',
        constraints: {
          isNotEmpty: 'username should not be empty',
        },
      },
      {
        property: 'password',
        constraints: {
          isLength: 'password must be at least 6 characters',
        },
      },
    ]);
  });

  it('should return an empty array when passed an empty array', () => {
    const formatted = formatErrors([]);

    expect(formatted).toEqual([]);
  });
  it('should return undefined when errors is undefined', () => {
    const formatted = formatErrors(undefined);

    expect(formatted).toBeUndefined();
  });

  it('should handle errors with missing constraints', () => {
    const validationErrors: ValidationError[] = [
      {
        property: 'username',
        constraints: undefined,
        children: [],
        target: {},
      },
    ];

    const formatted = formatErrors(validationErrors);

    expect(formatted).toEqual([
      {
        property: 'username',
        constraints: undefined,
      },
    ]);
  });
});
