import { Controller, Get, Post, Body, Delete, Param, Query } from '@nestjs/common';
import { AdvertsService } from './adverts.service';

@Controller('adverts')
export class AdvertsController {
  constructor(private readonly advertsService: AdvertsService) {}

  @Get()
  async findAll(@Query('sort') sort: string, @Query('search') search: string) {
    return this.advertsService.findAll(sort, search);
  }

  @Post()
  async create(@Body() dto: any) {
    return this.advertsService.create(dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.advertsService.remove(+id);
  }
}