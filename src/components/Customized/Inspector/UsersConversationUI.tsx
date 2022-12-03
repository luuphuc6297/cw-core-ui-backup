import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { isEqual } from 'lodash';
import { Conversation, ListResponse } from 'models';

interface UsersConversationUIProps {
    usersConversation: ListResponse;
    conversation: Conversation;
}

export const UsersConversationUI = ({ usersConversation, conversation }: UsersConversationUIProps) => {
    const userId = conversation.attributes.user['_id'];

    console.log('current conversation', conversation);

    return (
        <List component="div" disablePadding>
            {usersConversation.data.map((el: any, index: number) => {
                const { avatarUrl, firstName, lastName, _id } = el.attributes;
                const fullName = `${firstName} ${lastName}`;
                if (!isEqual(_id, userId)) {
                    return (
                        <ListItem button key={index}>
                            <ListItemAvatar>
                                <Avatar alt={fullName} src={avatarUrl} />
                            </ListItemAvatar>
                            <ListItemText primary={fullName} />
                        </ListItem>
                    );
                }
                return <></>;
            })}
        </List>
    );
};
