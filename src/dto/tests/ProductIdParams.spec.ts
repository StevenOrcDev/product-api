import { validate } from 'class-validator';
import { ProductIdParamsDTO } from '../ProductIdParams';
import { plainToClass } from 'class-transformer';

describe('ProductIdParamsDTO', () => {
  it('should pass validation when id is a valid string', async () => {
    const dto = new ProductIdParamsDTO();
    dto.id = '12345';

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation when id is empty', async () => {
    const dto = new ProductIdParamsDTO();
    dto.id = '';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNotEmpty).toBeDefined();
  });

  it('should fail validation when id is not a string', async () => {
    const dto = new ProductIdParamsDTO();
    (dto as any).id = 12345;

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isString).toBeDefined();
  });

  it('should transform id to string if given as a number', async () => {
    const dto = { id: 12345 };

    const transformedDto = plainToClass(ProductIdParamsDTO, dto);

    expect(typeof transformedDto.id).toBe('string');
  });
});
