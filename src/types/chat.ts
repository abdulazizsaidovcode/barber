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
  recipientId: string
  editId: any,
  replyId: any,
  deleteId: any,
  senderId: string | null,
  sendMessage: () => void,
  chat: ChatSentSmstList[],
  content: string,
  setContent: (val: any) => void,
  reply: () => void,
  deleteMessage: () => void,
  editMessage: () => void,
  setPhoto: any,
  markMessageAsRead: (val: any) => void,
}

export interface ChatSentSmstList {
  content: string,
  senderName: string
  createdAt: string,
  id: any,
  read: boolean,
  recipientId: string,
  senderId: string,
  userImgId: string | null,
  receiverName: string,
  receiverImg: string | null
  senderImg: string | null,
  replayDto: any,
  attachmentIds: any,
}
