import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductIdParamsDTO {
  @IsNotEmpty({
    message: 'Product ID is required',
  })
  @IsString()
  @Transform(({ value }) => value.toString())
  id: string;
}
