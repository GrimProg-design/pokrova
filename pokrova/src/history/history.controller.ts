import { Controller, Get, Post, Body } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async getHistory() {
    return this.historyService.getHistory();
  }

  @Post()
  async create(@Body() body: { title: string; content: string }) {
    return this.historyService.create(body);
  }
}