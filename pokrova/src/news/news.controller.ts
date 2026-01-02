import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { NewsService } from './news.service';
import { GetNewsDto } from './news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(@Query() query: GetNewsDto) {
    return this.newsService.getNews(query);
  }

  @Post()
  async create(@Body() body: any) {
    return this.newsService.create(body);
  }
}
