
export interface IConversation {
  id: string;
  users: Array<string>
  conversation: Array<IMessage>
  readBy: Array<string>;
}

export interface IMessage {
  date: string | Date;
  user: string;
  text: string;
}

