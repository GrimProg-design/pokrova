import { IsEnum, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { NewsType } from './news.entity';

export class GetNewsDto {
  @IsOptional()
  @IsEnum(NewsType)
  type?: NewsType;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 6;
}
