import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './post.entity';
import { NewsModule } from './news/news.module';
import { HistoryModule } from './history/history.module';
import { DirectionsModule } from './directions/directions.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthController } from './auth/auth.controller';
import { AdvertsModule } from './adverts/adverts.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Post]),
    NewsModule,
    HistoryModule,
    DirectionsModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      exclude: ['/api/(.*)'],
    }),
    AdvertsModule,
    ContactsModule,
  ],
  controllers: [AppController, AuthController, AuthController],
  providers: [AppService],
})
export class AppModule {}
