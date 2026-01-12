import { 
  Controller, 
  Get, 
  Query, 
  Post, 
  Body, 
  Param, 
  UseInterceptors, 
  UploadedFile, 
  UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { NewsService } from './news.service';
import { GetNewsDto } from './news.dto';
import { AdminGuard } from 'src/auth/auth.guard';
import { ParseIntPipe, BadRequestException } from '@nestjs/common';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(@Query() query: GetNewsDto) {
    return this.newsService.getNews(query);
  }

  @Get('archive')
  async getArchive(@Query() query: GetNewsDto) {
    return this.newsService.getArchive(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // Теперь 'id' гарантированно число. 
    // Если прилетит строка или NaN, NestJS сам вернет 400 Bad Request клиенту.
    return this.newsService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/news',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    const newsData = {
      ...body,
      imagePath: file ? `/uploads/news/${file.filename}` : null,
    };
    return this.newsService.create(newsData);
  }
}