import { SocketEvents } from 'shared/lib';

export interface WsType {
  type: typeof SocketEvents;
  data: string;
}
