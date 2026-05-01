import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule)
        private scheduleRepo: Repository<Schedule>,
    ) {}

    async findAll() {
        return this.scheduleRepo.find();
    }

    async create(data: any) {
        const schedule = this.scheduleRepo.create(data)
        return this.scheduleRepo.save(schedule);
    }
}
