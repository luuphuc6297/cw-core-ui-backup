import { Chatting } from 'components';
import UnSelectChat from 'components/Customized/RTC/UnSelectChat';
import { useParams } from 'react-router-dom';

const AreaContentRtc = () => {
    const { id } = useParams();

    return <>{id ? <Chatting /> : <UnSelectChat />}</>;
};

export default AreaContentRtc;
