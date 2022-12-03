import { PayloadSendEmail, PayloadSetupPassword, PayloadVerifiedEmail, UpdateProfile, VerifiedUser } from './forms';
import { PayloadUser } from './user';

export interface ResponseUser {
    token: string;
    payload: PayloadUser;
}

export interface ResponseSendEmail {
    attributes: PayloadSendEmail;
}

export interface ResponseVerifiedEmail {
    token?: string;
    user?: VerifiedUser;
    attributes?: PayloadVerifiedEmail;
}

export interface ResponseSetupPassword {
    attributes: PayloadSetupPassword;
    message?: string;
}

export interface ResponseUpdateProfile {
    id: string;
    attributes: UpdateProfile;
}
