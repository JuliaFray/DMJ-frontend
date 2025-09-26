import { TUser } from './profile.type';

export type TMessage = {
  id: number;
  text: string;
  from: TUser;
  to: TUser;
  createdAt: Date;
};

export type TDialog = {
  isPrivate: boolean;
  users: TUser[];
  _id: string;
  lastMsg: TMessage;
};

export type TDialogFriends = {
  name: string;
  avatar: string;
  status: string;
};
