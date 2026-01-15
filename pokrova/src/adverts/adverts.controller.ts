import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('adverts')
@Controller('adverts')
export class AdvertsController {
  constructor(private readonly advertsService: AdvertsService) {}

  @Get()
  async findAll(@Query('sort') sort: string, @Query('search') search: string) {
    return this.advertsService.findAll(sort, search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.advertsService.findOne(+id);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      // Принимаем до 5 файлов под ключом 'files'
      storage: diskStorage({
        destination: './uploads/adverts', // Папка сохранения
        filename: (req, file, cb) => {
          // Генерим уникальное имя: время + рандом + расширение
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: any,
  ) {
    // Получаем пути к сохраненным файлам
    const filePaths = files.map((file) => `/uploads/adverts/${file.filename}`);

    // Передаем данные в сервис, добавляя массив путей к картинкам
    return this.advertsService.create({
      ...dto,
      images: filePaths,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.advertsService.remove(+id);
  }
}
