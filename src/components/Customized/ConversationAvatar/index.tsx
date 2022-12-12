import { Box, styled } from '@mui/system';
import { conversationApis } from 'apis/conversationApis';
import { fileApis } from 'apis/fileApis';
import axios from 'axios';
import { values } from 'lodash';
import { useRef } from 'react';
import { useRtcStore } from 'store/zustand/rtcStore';
import { ConversationSlice, WorkSpaceSlice } from 'store/zustand/slices';
import { CustomizedAvatar } from '../CustomizedAvatar';

interface ConversationAvatarProps {
    avatarUrl: string;
    firstName: string;
    lastName: string;
    handleUpdateAvt?: (e: any) => void;
    handleUploadAvt?: (e: any) => void;
}

export const StyledWrapperAvatar = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '100%',
    width: '100%',
    '&:hover': {
        cursor: 'pointer',
        '&::before': {
            position: 'absolute',
            content: '"edit"',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '999px',
            zIndex: '1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
}));

const convertFileToBinary = (file: any) => {
    return new Promise((resolve) => {
        const reader: any = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(Buffer.from(reader.result));
    });
}

const AvatarUpload = ({
    avatarUrl,
    firstName,
    lastName,
}: ConversationAvatarProps) => {
    const elUploadImage = useRef<any>();

    const { conversation, updateDataConversationDetailFromSocket } = useRtcStore((state: ConversationSlice) => state);

    const { workspace } = useRtcStore((state: WorkSpaceSlice) => state);
    
    const handleUpdateAvt = () => {
        elUploadImage.current.click();
    };

    const handleUploadAvt = async (e: any) => {
        try {
            const files = values(e.target.files);
            const fileUpload = files[0];
            const formData = new FormData();
            formData.append('file', fileUpload);
            const datPresignedUrl = await fileApis.generatePresignedUrlSSO(fileUpload.name);
            const {
                attributes: {
                    presignedUrl,
                    originalUrl,
                }
            } = datPresignedUrl;
            const result: any = await conversationApis.updateConversation(workspace.id, conversation._id, { imagePath: originalUrl });
            updateDataConversationDetailFromSocket(conversation._id, result);
            const binary = await convertFileToBinary(fileUpload);
            await axios.put(presignedUrl, binary);
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <StyledWrapperAvatar onClick={handleUpdateAvt}>
            <CustomizedAvatar {...{ avatarUrl, firstName, lastName }} />
            <input
                ref={elUploadImage}
                type="file"
                style={{
                    display: 'none',
                }}
                onChange={handleUploadAvt}
                accept="image/png, image/jpeg"
            ></input>
        </StyledWrapperAvatar>
    );
};

export default AvatarUpload;
