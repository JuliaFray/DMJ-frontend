import { IUser } from './profile.type';

export interface IMessage {
  id: number;
  text: string;
  fromUserId: IUser;
  toUserId: IUser;
  createdAt: Date;
}

export interface IDialog {
  isPrivate: boolean;
  users: IUser[];
  _id: string;
  lastMsg: IMessage;
}

export interface IDialogFriends {
  name: string;
  avatar: string;
  status: string;
}
