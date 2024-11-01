import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from '@/message/message.module';
import { AiModule } from '@/ai/ai.module';
import { UserModule } from '@/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    MessagesModule,
    AiModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3', // FOR DEV ONLY
      database: 'sample.db', // FOR DEV ONLY
      autoLoadEntities: true,
      logging: true,
      synchronize: true, // FOR DEV ONLY
      dropSchema: true, // FOR DEV ONLY
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
