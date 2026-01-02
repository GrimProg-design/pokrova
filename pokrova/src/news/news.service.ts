import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { GetNewsDto } from './news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async getNews(queryDto: GetNewsDto) {
    const { type, limit } = queryDto;

    const query = this.newsRepository.createQueryBuilder('news');

    if (type) {
      query.where('news.type = :type', { type });
    }

    return await query.orderBy('news.createdAt', 'DESC').take(limit).getMany();
  }

  async create(dto: any) {
    const newNews = this.newsRepository.create(dto);
    return await this.newsRepository.save(newNews);
  }
}
