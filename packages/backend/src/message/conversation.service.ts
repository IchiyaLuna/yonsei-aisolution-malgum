import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Conversation } from './conversation.entity';
import { Message } from './message.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async create(
    new_conversation: DeepPartial<Conversation>,
  ): Promise<Conversation> {
    const conversation = this.conversationRepository.create(new_conversation);
    return await this.conversationRepository.save(conversation);
  }
}
