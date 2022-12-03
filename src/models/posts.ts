import { Meta } from './common';

export interface Owner {
    _id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    avatarUrl?: string;
    firstName?: string;
    lastName?: string;
}

export interface AttributesPost {
    communityId: string;
    content: string;
    user: Owner;
}

export interface Post {
    _id: string;
    type: string;
    attributes: AttributesPost;
    meta: Meta;
}
