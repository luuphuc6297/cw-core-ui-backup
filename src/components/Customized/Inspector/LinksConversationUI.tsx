import { Box, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledGridItem = styled(Grid)(({ theme }) => ({
    height: 100,
    overflow: 'hidden',
    position: 'relative',
}));

const StyledBoxOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    left: 0,
    top: 0,
    transition: 'all 0.1s',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
}));

export const LinksConversationUI = () => {
    const images: any = [];

    const imagesElm = images.map(({ _id, attributes }: any) => {
        return (
            <StyledGridItem
                key={_id}
                item
                xs={4}
                id={_id}
                // onClick={() => showFullScreen(item._id)}
            >
                <img src={attributes.link} alt={attributes.link} />
                <StyledBoxOverlay />
            </StyledGridItem>
        );
    });

    return (
        <Grid container spacing={2}>
            {imagesElm}
        </Grid>
    );
};
