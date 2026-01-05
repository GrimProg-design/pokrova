import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryEntity } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: Repository<HistoryEntity>,
  ) {}

  async getHistory() {
    return await this.historyRepository.findOne({ where: { id: 1 } });
  }

  async create(dto: { title: string; content: string }) {
    const history = this.historyRepository.create(dto);
    return await this.historyRepository.save(history);
  }
}