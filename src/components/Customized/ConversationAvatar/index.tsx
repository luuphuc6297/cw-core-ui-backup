import { Box, styled } from '@mui/system';
import { values } from 'lodash';
import { useRef } from 'react';
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

const AvatarUpload = ({
    avatarUrl,
    firstName,
    lastName,
}: ConversationAvatarProps) => {
    const elUploadImage = useRef<any>();

    const handleUpdateAvt = () => {
        elUploadImage.current.click();
    };

    const handleUploadAvt = (e: any) => {
        const files = values(e.target.files);
        const fileUpload = files[0];
        const formData = new FormData();
        formData.append('file', fileUpload);
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
