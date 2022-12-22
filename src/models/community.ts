import { AttributesUser } from './user';

export interface IAttributesCommunity {
    status: string;
    title: string;
    mode: string;
    imageUrl: string;
    user: AttributesUser;
}
