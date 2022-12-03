import axiosRTC from 'apis/clients/axiosRTC';
import { ListResponse, PresignedUrlConversation } from 'models';

export const uploadApis = {
    getListUser: (workspaceId: string): Promise<ListResponse> => {
        const url = `/${workspaceId}/api/users`;
        return axiosRTC.get(url);
    },

    uploadImageConversation: async ({ files, workspaceId, conversationId }: PresignedUrlConversation): Promise<any> => {
        const url = `/${workspaceId}/api/conversations/${conversationId}/presigned-url`;
        // const listImagePresigned: any = [];
        // const listFileBinary = Promise.allSettled(
        //     files.map((file: any) => {
        //         return new Promise((resolve) => {
        //             const reader: any = new FileReader();
        //             reader.readAsArrayBuffer(file);
        //             reader.onload = () => resolve(Buffer.from(reader.result));
        //         });
        //     })
        // );

        // await Promise.allSettled(files.map((file: any) => axiosRTC.post(url, { fileName: file.name }))).then(
        //     (results: any) => {
        //         results.filter((result: any, index: number) =>
        //             result.status === 'fulfilled' ? listImagePresigned.push({ value: result.value, index }) : false
        //         );
        //     }
        // );
        // const indexListFileBinary: any = {};
        // (await listFileBinary).filter((fileBinary: any, index: number) => {
        //     if (fileBinary.status === 'fulfilled') {
        //         indexListFileBinary[index] = fileBinary.value;
        //     }
        //     return false;
        // });

        // if (listImagePresigned.length === 0) {
        //     return;
        // }

        // const listDataRes: any = [];
        // await Promise.allSettled(
        //     listImagePresigned.map((image: any) => {
        //         const { value, index } = image;
        //         const data = indexListFileBinary[index];
        //         return axios.put(value.attributes.presignedUrl, data);
        //     })
        // ).then((results: any) => {
        //     results.filter((result: any, index: number) => {
        //         const { mimeType } = listImagePresigned[index].value.attributes;
        //         const path = listImagePresigned[index].value.attributes.path;
        //         return result.status === 'fulfilled' ? listDataRes.push({ value: { path, mimeType }, index }) : false;
        //     });
        // });
        // return listDataRes;
    },
};
