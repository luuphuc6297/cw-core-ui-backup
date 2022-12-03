import { StateCreator } from 'zustand';
export interface UploadSlice {
    loading: boolean;
}

export const createUploadSlice: StateCreator<
    UploadSlice,
    [['zustand/devtools', never], ['zustand/persist', never]],
    []
> = (set, get) => ({
    loading: false,
});
