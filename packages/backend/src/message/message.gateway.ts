import {
  OnGatewayInit,
  WebSocketServer,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessageService) {}

  afterInit() {
    console.log('Socket.io server initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { conversation_id: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.conversation_id);
    console.log(`Client ${client.id} joined room ${data.conversation_id}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { conversation_id: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.conversation_id);
    console.log(`Client ${client.id} left room ${data.conversation_id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data.message);
    try {
      const response = await this.messagesService.getOpenAIResponse(
        data.message,
      );

      client.emit('receiveMessage', response);
    } catch (error) {
      console.error('Error getting chat response:', error);
    }
  }

  emitMessageByConversationId(conversation_id: string, message: Message) {
    this.server.to(conversation_id).emit('newMessage', message);
  }
}
