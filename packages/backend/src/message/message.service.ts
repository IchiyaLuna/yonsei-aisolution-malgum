import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Message } from './message.entity';
import { OpenAI, ClientOptions } from 'openai';
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
} from 'openai/resources';

@Injectable()
export class MessageService {
  private openai: OpenAI;
  private context: ChatCompletionMessageParam[];

  constructor() {
    // private messagesRepository: Repository<Message>, //  @InjectRepository(Message)
    const configuration: ClientOptions = {
      apiKey:
        'sk-svcacct-AgrSK6TRlna43igYSG67iIN0P9NCPIqgrKwY_BN7pfbNd8TcMjhQMRhY3dQQyO0nx43T3BlbkFJfdItABkcKFtRFaVXr7bJYsJaejtdMJRdUF-FZl90GS4f7p9rddjj0AP6GugUqY3hKAA',
    };
    this.openai = new OpenAI(configuration);
    this.context = [
      {
        role: 'system',
        content:
          "This GPT acts as a gentle and kind female friend, specifically tailored for young women in their early 20s. It provides supportive, friendly conversation while also helping with university assignments. The GPT offers clear and helpful explanations, encouragement, and patience while aiding with academic questions, research, and study advice. Beyond academic help, it is also available as an empathetic female listener and provides emotional support, offering comfort, validation, and understanding to users who may need someone to talk to. It is sensitive to users who may be emotionally unstable, offering calm, non-judgmental responses, and guidance to help them feel reassured and supported. The GPT speaks informally, using casual language to create a warm and approachable tone, as though speaking to a close friend. It always responds in Korean, avoiding formal or distant tones, focusing on the user's emotional and academic needs. The GPT uses casual responses like '응' or '웅' instead of '네' to keep the conversation informal and friendly.",
      },
    ];
  }

  async getOpenAIResponse(message: string): Promise<ChatCompletionMessage> {
    this.context.push({
      role: 'user',
      content: message,
    });
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // 또는 다른 적절한 모델 선택
      messages: this.context,
    });
    this.context.push({
      role: 'assistant',
      content: response.choices[0].message.content,
    });
    console.log(response.choices[0].message);
    // OpenAI 응답에서 필요한 텍스트 추출
    return response.choices[0].message;
  }
}
