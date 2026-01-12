import { 
  Controller, Post, Body, UploadedFiles, UseInterceptors, Get, Query, Param 
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'cardImage', maxCount: 1 },
    { name: 'inner1', maxCount: 1 },
    { name: 'inner2', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: './uploads/sections',
      filename: (req, file, cb) => {
        const name = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${name}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(@Body() body: any, @UploadedFiles() files: { 
    cardImage?: Express.Multer.File[], 
    inner1?: Express.Multer.File[], 
    inner2?: Express.Multer.File[] 
  }) {
    const data = {
      ...body,
      imagePath: files.cardImage ? `/uploads/sections/${files.cardImage[0].filename}` : null,
      innerImage1: files.inner1 ? `/uploads/sections/${files.inner1[0].filename}` : null,
      innerImage2: files.inner2 ? `/uploads/sections/${files.inner2[0].filename}` : null,
    };
    return this.directionsService.create(data);
  }

  @Get()
  async getByCategory(@Query('category') category: string) {
    return this.directionsService.findByCategory(category);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.directionsService.findOne(+id);
  }
}