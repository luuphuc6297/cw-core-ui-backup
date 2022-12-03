import { Meta } from './common';
import { AttributesConversation } from './conversation';
import { MessageAttributes } from './messages';
import { AttributesUser } from './user';

interface ConfigsSocketEvent {
    body?: any;
    headers?: any;
    query?: any;
}

export interface SocketData {
    name: string;
    age: number;
}

export interface ResponseSocketItem {
    _id: string;
    attributes: AttributesConversation & MessageAttributes;
    meta: Meta;
    type: string;
}

export interface IResponseSocket {
    attributes: ISystemNotification & IAttributesTyping;
    meta: Meta;
}

export interface ISystemNotification {
    conversationId: string;
    message: string;
    requestType: 'REQUEST_DELETE_CONVERSATION' | string;
}

export interface IAttributesTyping {
    conversationId: string;
    user: AttributesUser;
}

export interface ServerToClientEvents {
    REQUEST_JOIN_CONVERSATIONS: (data: ConfigsSocketEvent) => void;
    RESPONSE_CREATE_MESSAGE: (data: ResponseSocketItem) => void;
    RESPONSE_STOP_TYPING: (data: IResponseSocket) => void;
    RESPONSE_START_TYPING: (data: IResponseSocket) => void;
    SYSTEM_NOTIFICATION: (data: IResponseSocket) => void;
    RESPONSE_UPDATE_CONVERSATION: (data: ResponseSocketItem) => void;
    RESPONSE_CREATE_CONVERSATION: (data: SocketData) => void;
    WOOF_WOOF: () => void;
    RESPONSE_INVITE_USERS: (data: IResponseSocket) => void;
    RESPONSE_JOIN_CONVERSATIONS: (data: IResponseSocket) => void;
    RESPONSE_LEAVE_CONVERSATION: (data: IResponseSocket) => void;
}

export interface ClientToServerEvents {
    MEOW_MEOW: (configs: ConfigsSocketEvent) => void;
    REQUEST_JOIN_CONVERSATION: (configs: ConfigsSocketEvent) => void;
    hello: () => void;
}
