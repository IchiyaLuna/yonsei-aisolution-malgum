import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { Conversation } from './conversation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from './message.controller';
import { ConversationService } from './conversation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation])],
  providers: [MessageService, ConversationService, MessageGateway],
  controllers: [MessagesController],
})
export class MessagesModule {}
