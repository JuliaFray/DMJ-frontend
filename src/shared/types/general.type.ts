import { SocketEvents } from '../lib';

export interface WsType {
  type: typeof SocketEvents;
  data: string;
}

export type Nullable<T> = T | null;
