import { Box } from '@mui/material';
import { styled } from '@mui/system';

const bannerUrl =
    'https://res.cloudinary.com/coaching-workspace/image/upload/h_1080/v1646637570/banner/annie-spratt-MChSQHxGZrQ-unsplash-min_mx2wvc.jpg';

const Container = styled(Box)({
    height: 'calc(var(--vh, 1vh)*100)',
    position: 'relative',
    overflow: 'hidden',
});

const CustomBanner = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 1.5,
});

export const Banner = () => {
    return (
        <Container>
            <CustomBanner src={bannerUrl} />
        </Container>
    );
};
