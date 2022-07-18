import {IConversation} from "./IMessages";

export interface IUser {
  id: string;
  username: string;
  password: string;
  messages: Array<IConversation>;
}

