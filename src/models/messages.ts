import { Meta } from './common';
import { UserInMessage } from './user';

export interface LastMessage {
    content: string;
    contentType: string;
    conversationId: string;
    createdAt: string;
    generator: string;
    updatedAt: string;
    _id: string;
}

export interface MessageAttributes {
    contentType: string;
    conversationId: string;
    generator: string;
    user?: UserInMessage;
    content: string;
    _id: string;
}

export interface Message {
    attributes: MessageAttributes;
    meta: Meta;
    type: string;
    _id: string;
}
