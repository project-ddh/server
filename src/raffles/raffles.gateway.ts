import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/raffles' }) //여기에 네임스페이스 이름
export class RafflesGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private logger = new Logger('chat');

  afterInit() {
    this.logger.log('init');
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    // const user = await this.socketModel.findOne({ id: socket.id });
    // if (user) {
    //   socket.broadcast.emit('disconnect_user', user.username);
    //   await user.delete();
    // }
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('bidding') //여기에 이벤트 이름
  async bid(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    console.log(data);
    //추후에 data Dto만들기
    const date = new Date();
    const broadcastData = { data: data, time: date };
    socket.broadcast.emit('bidList', broadcastData); //데이터 뿌려줌
    return data; //리턴도 emit과 같은 것이다
  }
}
