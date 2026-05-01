import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
    constructor(private scheduleServise: ScheduleService) {}

    @Get()
    getScedule() {
        return this.scheduleServise.findAll()
    }

    @Post()
    setSchedule(@Body() data: any) {
        console.log("Body: ", data)
        return this.scheduleServise.create(data)
    }
}
