import React from 'react';
import { useConversationList } from 'services';

const GetPayload = () => {
    const { conversations } = useConversationList('', {
        page: 1,
        limit: 10,
        count: 0,
        totalPages: 0,
        skip: 0,
    });

    React.useEffect(() => {}, []);

    return <></>;
};
export default GetPayload;
