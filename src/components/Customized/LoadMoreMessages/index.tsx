import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { BoxMessages, DateMessages, TypingChat } from 'components';
import { chain, isEqual, keys, orderBy } from 'lodash';
import { AttributesUser, CurrentUser, LastMessage, ListResponse, Message } from 'models';
import moment from 'moment';
import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

interface LoadMoreMessagesProps {
    currentUser?: CurrentUser;
    messages?: ListResponse;
    typing: AttributesUser[];
    loadMessages: () => void;
}

const StyledBoxLoadMore = styled(Box)(({ theme }) => ({
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
    padding: 16,
    position: 'relative',
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    marginTop: 16,
}));

export const LoadMoreMessages = ({ currentUser, messages, typing, loadMessages }: LoadMoreMessagesProps) => {
    const [currentData, setCurrentData] = React.useState<any>([]);
    const [oldData, setOldData] = React.useState<Message[]>([]);

    const [more, setMore] = React.useState<boolean>((messages?.meta.totalPages || 0) > ((messages?.meta.skip || 0) / (messages?.meta.limit || 30) + 1));

    const elmContent: any = document.getElementById('scrollable-box');

    React.useEffect(() => {
        const count: number | any = messages?.meta?.count;
        if (!isEqual(currentData, oldData)) {
            if (currentData.length - oldData.length === 1) {
                elmContent.scrollTo({
                    top: elmContent.scrollHeight - elmContent.clientHeight,
                });
            }
            setOldData(currentData);
        } else {
            if (count !== 0 && count - currentData.length === 0 && more) {
                setMore(false);
            }
        }
    }, [currentData]);

    React.useEffect(() => {
        setCurrentData(messages?.data);
    }, [messages]);

    // Maybe change useCallback
    const renderMessageItem = () => {
        const groupByDate = chain(
            orderBy(
                currentData.map((i: any) => ({ ...i, createdAt: moment(i.meta.createdAt).format('YYYY-MM-DD') })),
                ['createdAt'],
                ['asc']
            )
        )
            .groupBy('createdAt')
            .value();

        return (
            <>
                {keys(groupByDate).map((date: string, index: number) => {
                    const messagesInDay = groupByDate[date].map((message: Message, index: number) => {
                        const lastMessage: LastMessage | any =
                            index === groupByDate[date].length - 1 ? {} : groupByDate[date][index + 1];
                        return (
                            <Box key={message._id}>
                                <BoxMessages message={message} lastMessage={lastMessage} currentUser={currentUser} />
                            </Box>
                        );
                    });
                    return (
                        <Box key={`${date}${index}`}>
                            <DateMessages key={date} createdAtMessage={date} createdAtLastMessage={''} />
                            {messagesInDay}
                        </Box>
                    );
                })}
            </>
        );
    };

    return (
        <StyledBoxLoadMore id="scrollableBox">
            <InfiniteScroll
                dataLength={currentData.length}
                scrollableTarget="scrollableBox"
                next={loadMessages}
                inverse={true}
                hasMore={more}
                loader={
                    <Box sx={{ textAlign: 'center', position: 'fixed', top: '200px', left: '65%' }}>
                        <StyledCircularProgress />
                    </Box>
                }
            >
                {renderMessageItem()}
                {typing?.map((user: AttributesUser) => {
                    return user && user._id !== currentUser?.id && <TypingChat user={user} />;
                })}
            </InfiniteScroll>
        </StyledBoxLoadMore>
    );
};
