import { ItemResponse, Meta } from './common';
import { LastMessage } from './messages';
import { ShortCutAttributesUser } from './user';

export interface AttributesConversation {
    contextId: number;
    lastMessage: LastMessage;
    mode: string;
    status: string;
    title: string;
    imagePath?: string;
    userCount: number;
    recentActivities: any;
    color: string;
    user: ShortCutAttributesUser;
    imageUrl: string;
}

export interface Conversation {
    _id: string;
    type: string;
    attributes: AttributesConversation;
    meta: Meta;
}

export interface IDataConversationDetail {
    [id: string]: ItemResponse;
}

export interface PresignedUrlConversation {
    files: any;
    workspaceId: string;
    conversationId: string;
}
