import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionsController } from './directions.controller';
import { DirectionsService } from './directions.service';
import { DirectionEntity } from './directions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectionEntity])],
  controllers: [DirectionsController],
  providers: [DirectionsService],
})
export class DirectionsModule {}