import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}