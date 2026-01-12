import { Injectable } from '@nestjs/common';
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
    let query = this.repo.createQueryBuilder('advert');

    if (search) {
      query.andWhere('advert.title ILIKE :search', { search: `%${search}%` });
    }

    if (sort === 'new') query.orderBy('advert.createdAt', 'DESC');
    else if (sort === 'old') query.orderBy('advert.createdAt', 'ASC');
    else {
      // Имитация рекомендаций — рандомная сортировка в Postgres
      query.orderBy('RANDOM()');
    }

    return await query.getMany();
  }

  async create(dto: any) {
    const ad = this.repo.create(dto);
    return await this.repo.save(ad);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}