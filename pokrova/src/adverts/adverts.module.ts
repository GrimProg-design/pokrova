import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertsController } from './adverts.controller';
import { AdvertsService } from './adverts.service';
import { AdvertEntity } from './adverts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdvertEntity]), 
  ],
  controllers: [AdvertsController],
  providers: [AdvertsService]
})
export class AdvertsModule {}
