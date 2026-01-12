import { IsEnum, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { NewsType } from './news.entity';

export class GetNewsDto {
  @IsOptional()
  @IsEnum(NewsType)
  type?: NewsType;

  @IsOptional()
  @Type(() => Number) // Преобразует строку из URL в число
  @IsInt()
  @Min(1)
  limit: number = 6; // Для главной оставим 6, в архиве будем слать 4

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1; // Новое поле для пагинации
}