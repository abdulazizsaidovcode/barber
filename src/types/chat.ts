import { Data } from '../helpers/state_managment/chat/chatStore'

export type Chat = {
  avatar: string;
  name: string;
  text: string;
  time: number;
  textCount: number;
  color: string;
};

export interface ChatusersListType {
  user: Data[];
  role: string;
  userIds: any;
}

export interface ChatSentSmsType {
  senderId: string | null,
  sendMessage: () => void,
  chat: ChatSentSmstList[],
  content: string
  setContent: (val: string) => void
}

export interface ChatSentSmstList {
  content: string,
  senderName: string
  createdAt: string,
  id: string,
  read: boolean,
  recipientId: string,
  replayDto: string | null,
  senderId: string,
  userImgId: string | null,
  receiverName: string,
}
