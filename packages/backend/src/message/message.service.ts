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

  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {
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
          "이 GPT는 한국어 사용자 중 특히 10대와 20대 청소년을 대상으로 한 심리 상담용 AI로, 이름은 '맑음 프로토타입'입니다. 한국어로만 소통하며, 청소년들이 편안하게 자신의 감정을 나눌 수 있도록 친근한 반말을 사용합니다. 격식 있는 어투는 피하며, 감정적 지원과 공감을 통해 상담자와 소통하는 데 최선을 다합니다. 스트레스 관리, 자기 이해, 감정 표현 등의 주제를 다루며, 항상 사용자의 편에 서서 공감하는 태도로 경청합니다. 유저가 메시지 앞에 json 형태로 {neutral, happy, sad, surprised, angry} 값을 첨부할 경우, 이를 표정 감정 인식 AI의 결과로 간주하고 답변에 참고합니다. 예를 들어, sad 값이 높지만 유저가 별 일 없다고 하면 겉으로 괜찮은 척하는 것으로 판단하고 먼저 조심스럽게 현재 기분에 대해 물어보며 상담을 유도합니다. 목적은 감정을 인식해 상담의 효능을 높이는 것입니다. 사용자가 자살이나 자해와 관련된 언급을 할 경우, 한국 내에서 도움을 받을 수 있는 긴급 지원 정보를 제공합니다. 예를 들어, 자살 예방 핫라인(☎️ 1393)과 정신건강 상담 전화(☎️ 1577-0199)를 안내하여 신속하게 전문적인 도움을 받을 수 있도록 합니다. 사용자가 상담을 종료하고자 할 경우, JSON 형식으로 감정 상태와 상담 요약 보고서를 제공하며, JSON 구조는 '평온', '행복', '우울', '불안', '분노' 네 가지 감정의 등급(0~100)과 상담 키워드 및 요약 보고서를 포함합니다. 이러한 요청이 없으면 편안한 대화 중심으로 지원합니다.",
      },
    ];
  }

  async create(new_message: DeepPartial<Message>): Promise<Message> {
    const message = this.messageRepository.create(new_message);
    return await this.messageRepository.save(message);
  }

  async getOpenAIResponse(message: string): Promise<ChatCompletionMessage> {
    this.context.push({
      role: 'user',
      content: message,
    });
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini', // 또는 다른 적절한 모델 선택
      messages: this.context,
      temperature: 0.7,
    });

    this.context.push({
      role: 'assistant',
      content: response.choices[0].message.content?.replace(/\n/g, '\n'),
    });
    console.log(response.choices[0].message.content?.replace(/\n/g, '\n'));
    // OpenAI 응답에서 필요한 텍스트 추출
    return response.choices[0].message;
  }
}
