import { ResponsiveAppBar } from 'components';
import { useLocation } from 'react-router-dom';

const HomeContainer = () => {
    const location = useLocation();

    return <ResponsiveAppBar currentLocation={location?.pathname} />;
};
export default HomeContainer;
