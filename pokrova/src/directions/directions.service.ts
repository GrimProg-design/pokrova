import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectionEntity } from './directions.entity';

@Injectable()
export class DirectionsService {
  constructor(
    @InjectRepository(DirectionEntity)
    private readonly directionRepository: Repository<DirectionEntity>,
  ) {}

  // Получить список по категории (только заголовки и id для карточек)
  async findByCategory(category: string) {
    return await this.directionRepository.find({
      where: { category },
      select: ['id', 'title', 'imagePath', 'category'],
    });
  }

  // Получить одну запись целиком (со всем HTML контентом)
  async findOne(id: number) {
    const direction = await this.directionRepository.findOne({ where: { id } });
    if (!direction) throw new NotFoundException('Направление не найдено');
    return direction;
  }

  // Создать новую запись (для Postman)
  async create(dto: any) {
    const newDirection = this.directionRepository.create(dto);
    return await this.directionRepository.save(newDirection);
  }
}
