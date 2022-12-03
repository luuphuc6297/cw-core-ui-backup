import { Meta } from './common';
import { WorkSpaces } from './workspace';
export interface User {
    email: string;
    password: string;
}

export interface TimeZone {
    value: string;
    offset: number;
    abbrev: string;
}

export interface AttributesUser {
    _id: string;
    token: string;
    email: string;
    status: string;
    firstName: string;
    lastName: string;
    phone?: string;
    timezone?: TimeZone;
    avatarUrl?: string;
    password?: string;
    bio?: string;
    setPassword: boolean;
}

export interface ShortCutAttributesUser {
    avatarUrl?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    _id: string;
}

export interface CurrentUser {
    id: string;
    attributes: AttributesUser;
}

export interface WorkspaceUser {
    _id: string;
    type: string;
    attributes: ShortCutAttributesUser;
}

export interface AttributesInviteUsers {
    message: string;
}

export interface InviteUserDataProps {
    attributes: AttributesInviteUsers;
    meta: Meta;
}

export interface UserInMessage {
    avatarUrl?: string;
    createdAt?: string;
    email: string;
    firstName: string;
    lastName: string;
    updatedAt?: string;
    _id: string;
}
export interface PayloadUser {
    id: string;
    iss?: string;
    sub?: string;
    type: string;
    status: string;
    timezone?: TimeZone;
    createdAt?: string;
    updatedAt?: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatarUrl?: string;
    setPassword: boolean;
    bio?: string;
    workspaces: WorkSpaces[];
    token: string;
}
export interface ResponseLoginUser {
    token: string;
    payload: PayloadUser;
}