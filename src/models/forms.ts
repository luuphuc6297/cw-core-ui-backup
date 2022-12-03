import { TimeZone } from './user';

export interface Login {
    email: string;
    password: string;
}
export interface Register {
    email: string;
}

export interface VerifyEmail {
    email: string;
    code: string;
}

export interface SetupPassword {
    password: string;
}

export interface UploadAvatar {
    attributes: any;
}

export interface VerifiedUser {
    status: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatarUrl?: string;
    password?: string;
    bio?: string;
    timezone?: TimeZone;
}

export interface PayloadSendEmail {
    message: string;
    data: Register;
}

export interface PayloadVerifiedEmail {
    message: string;
    data: PayloadVerifiedUser;
    email: string;
}

export interface PayloadVerifiedUser {
    token: string;
    user: VerifiedUser;
}

export interface PayloadSetupPassword {
    message: string;
}

export interface UpdateProfile {
    status: string;
    firstName: string;
    lastName: string;
    phone?: string;
    timezone?: TimeZone;
    avatarUrl?: string;
    password: string;
    bio?: string;
    navigate?: any;
}

export interface SendMessagesForm {
    messages: string;
}

export interface CreateConversationForm {
    title: string;
    selectedId: string[];
}
