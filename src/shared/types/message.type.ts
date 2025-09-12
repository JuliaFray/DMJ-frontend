import { TProfile } from './profile.type';

export type TMessage = {
  id: number;
  text: string;
  from: TProfile;
  to: TProfile;
  createdAt: Date;
};

export type TDialog = {
  isPrivate: boolean;
  users: TProfile[];
  _id: string;
  lastMsg: TMessage;
};

export type TDialogFriends = {
  name: string;
  avatar: string;
  status: string;
};
