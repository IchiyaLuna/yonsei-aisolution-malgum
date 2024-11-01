import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { ConversationService } from '@/message/conversation.service';

@Controller('message')
export class MessagesController {
  constructor(
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService,
  ) {}

  // Post new message
  @Post()
  async postMessage(
    @Headers('Authorization') user_id?: string,
    @Body('conversation_id') conversation_id?: string,
    @Body('content') content?: string,
  ): Promise<Message> {
    // Step 1. Check required client-provided data
    if (!user_id)
      // sender_id is required
      throw new HttpException('No user_id provided', HttpStatus.UNAUTHORIZED);
    if (!content || content.length === 0) {
      // No empty text allowed
      throw new HttpException(
        ' No empty data.text allowed',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Step 2. Create conversation room if not exist
    if (!conversation_id) {
      const conversation = await this.conversationService.create({
        user_id,
      });
      conversation_id = conversation.id;
    }
    // Step 3. Create message
    const message = await this.messageService.create({
      conversation_id,
      role: 'user',
      content,
    });
    // Step 4. Return created message
    return message;
  }
}
