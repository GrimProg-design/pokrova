import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdvertEntity } from './adverts.entity';

@Injectable()
export class AdvertsService {
  constructor(
    @InjectRepository(AdvertEntity)
    private repo: Repository<AdvertEntity>,
  ) {}

  async findAll(sort: string, search: string) {
    const query = this.repo.createQueryBuilder('advert');

    if (search) {
      query.andWhere('advert.title ILIKE :search', { search: `%${search}%` });
    }

    if (sort === 'new') query.orderBy('advert.createdAt', 'DESC');
    else if (sort === 'old') query.orderBy('advert.createdAt', 'ASC');
    else query.orderBy('RANDOM()');

    return await query.getMany();
  }

  // Новый метод для получения одного объявления
  async findOne(id: number) {
    const ad = await this.repo.findOne({ where: { id } });
    if (!ad) throw new NotFoundException('Объявление не найдено');
    return ad;
  }

  async create(dto: any) {
    // В dto теперь должен приходить массив images: string[]
    const ad = this.repo.create(dto);
    return await this.repo.save(ad);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}