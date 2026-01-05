import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  // GET /api/directions?category=education
  @Get()
  async getByCategory(@Query('category') category: string) {
    return this.directionsService.findByCategory(category);
  }

  // GET /api/directions/5
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.directionsService.findOne(+id);
  }

  // POST /api/directions
  @Post()
  async create(@Body() body: any) {
    return this.directionsService.create(body);
  }
}