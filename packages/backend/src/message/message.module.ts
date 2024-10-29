import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';

@Module({
  imports: [],
  providers: [MessageService, MessageGateway],
  controllers: [],
})
export class MessagesModule {}
