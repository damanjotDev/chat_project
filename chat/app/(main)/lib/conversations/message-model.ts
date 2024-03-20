import { UserModel } from "../users/user-model";
import { ConversationModal } from "./conversation-model";
import { ChatType } from "./contant";


export interface MesssageModal {
    _id: string;
    body: string;
    image: string;
    video: string;
    file: string;
    userIds: any[];
    users: UserModel[];
    messageSentBy: string;
    chat: ConversationModal;
    createdAt: Date;
    updatedAt: Date
  }

export interface GetMessageResposeModel extends ConversationModal {}
