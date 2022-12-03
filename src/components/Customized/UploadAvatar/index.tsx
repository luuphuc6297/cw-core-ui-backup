import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';
// import { useAppDispatch } from 'app/hooks';
// import { updateProfileActions } from 'features/auth/updateProfileSlice';
import React from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadAvatarProps {
    avatarUrl?: string;
    percent?: number;
}

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderRadius: '50%',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: 128,
    height: 128,
    marginRight: 24,
    cursor: 'pointer',
    justifyContent: 'center',
};

const focusedStyle = {
    borderColor: '#29b6f6',
};

const acceptStyle = {
    borderColor: '#66bb6a',
};

const rejectStyle = {
    borderColor: '#f44336',
};

const CaptionUpload = styled(Typography)({
    fontSize: 14,
    textAlign: 'center',
});

const UploadBtn = styled(Button)({
    height: 40,
    textTransform: 'none',
    fontWeight: 'bold',
    marginBottom: 24,
});

const DeletePhotoBtn = styled(Button)({
    height: 40,
    textTransform: 'none',
    fontWeight: 'bold',
});

const StyledAvatarBox = styled('div')(({ theme }) => ({
    width: 128,
    height: 128,
    marginRight: 24,
}));

const StyledAvatar = styled('img')(({ theme }) => ({
    width: '100%',
    borderRadius: '50%',
    objectFit: 'contain',
}));

const StyledInputUpload = styled('input')(({ theme }) => ({
    opacity: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 1,
}));

export const UploadAvatar = ({ avatarUrl, percent }: UploadAvatarProps) => {
    // const dispatch = useAppDispatch();
    const [files, setFiles] = React.useState<any>([]);

    React.useEffect(() => {
        if (avatarUrl) setFiles([{ avatar: avatarUrl }]);
    }, [avatarUrl]);

    React.useEffect(
        () => () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.avatar));
        },
        [files]
    );

    // React.useEffect(() => {}, [percent]);

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        accept: 'image/*',
        onDrop: (acceptedFiles: any) => {
            setFiles(
                acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        avatar: URL.createObjectURL(file),
                    })
                )
            );
            const acceptFile = acceptedFiles[0];
            const form = new FormData();
            form.append('avatar', acceptFile);
            // dispatch(updateProfileActions.uploadAvatar(form));
        },
    });

    const style: any = React.useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    const thumbs = files.map((file: any) => (
        <StyledAvatarBox key={file?.name}>
            <StyledAvatar src={avatarUrl} alt={file.name} />
        </StyledAvatarBox>
    ));

    const renderPreview = (percent?: any) => {
        return (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
                {percent ? (
                    <div {...getRootProps({ style })}>
                        <CircularProgress size={16} color="primary" />
                    </div>
                ) : (
                    <aside>{thumbs}</aside>
                )}
            </>
        );
    };

    const renderUploadArea = React.useCallback(() => {
        return (
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <PersonAddAltIcon />
                <CaptionUpload>Drag 'n' drop your avatar here</CaptionUpload>
            </div>
        );
    }, [getInputProps, getRootProps, style]);

    const onDeleteAvatar = React.useCallback(() => {
        setFiles([]);
        // dispatch(updateProfileActions.deleteAvatar());
    }, []);

    const onUploadAvatar = (e: any) => {
        const banner = e.target.files[0];
        const form = new FormData();
        form.append('avatar', banner);
        // dispatch(updateProfileActions.uploadAvatar(form));
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            {files.length > 0 ? renderPreview(percent) : renderUploadArea()}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <UploadBtn variant="contained">
                    <StyledInputUpload
                        type="file"
                        accept="image/jpeg,image/png,image/svg,image/gif"
                        multiple
                        onChange={onUploadAvatar}
                    />
                    Upload your avatar
                </UploadBtn>
                <DeletePhotoBtn variant="outlined" startIcon={<DeleteIcon />} onClick={onDeleteAvatar}>
                    Delete photo
                </DeletePhotoBtn>
            </Box>
        </Box>
    );
};
