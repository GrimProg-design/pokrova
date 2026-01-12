import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { GetNewsDto } from './news.dto';
import { NotFoundException } from '@nestjs/common';

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

  async findOne(id: number) {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException(`Новость с id ${id} не найдена`);
    }
    return news;
  }

  async getArchive(queryDto: GetNewsDto) {
    const { type, limit = 4, page = 1 } = queryDto; // По умолчанию 4 новости и 1 страница
    const skip = (page - 1) * limit;

    const query = this.newsRepository.createQueryBuilder('news');

    if (type) {
      query.where('news.type = :type', { type });
    }

    const [items, total] = await query
      .orderBy('news.createdAt', 'DESC')
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    return {
      items,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: +page,
    };
  }
}
