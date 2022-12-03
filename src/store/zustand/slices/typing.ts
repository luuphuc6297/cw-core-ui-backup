import _ from 'lodash';
import { AttributesUser } from 'models';
import { StateCreator } from 'zustand';

export interface TypingSlice {
    loading: boolean;
    typing: any[];
    getStartTypingUser: (user: AttributesUser) => void;
    removeStartTypingUser: (user: AttributesUser) => void;
}

const initData: any[] = [];

export const createTypingSlice: StateCreator<
    TypingSlice,
    [['zustand/devtools', never], ['zustand/persist', never]],
    []
> = (set, get) => ({
    loading: false,
    typing: initData,
    getStartTypingUser: (user: AttributesUser) => {
        const typing: any = get().typing;

        const indexUser = typing.findIndex((item: any) => _.get(item, '_id', '') === user._id);
        if (indexUser < 0) {
            set(() => ({ typing: [...typing, user] }));
        }
    },
    removeStartTypingUser: (user: AttributesUser) => {
        const typing: any = get().typing;

        const newData = typing.filter((item: any) => _.get(item, '_id', '') !== user._id);
        set(() => ({ typing: newData }));
    },
});
