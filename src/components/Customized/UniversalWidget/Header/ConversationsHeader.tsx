import { ArrowBack } from '../../ArrowBack';
import { ConversationsTitle } from './ConversationsTitle';
import { UniversalHeaderWrapper } from './UniversalHeaderWrapper';

interface ConversationsHeaderProps {
    title: string;
    firstName: string;
    lastName: string;
    onBackConversations: () => void;
}

export const ConversationsHeader = ({ title, firstName, lastName, onBackConversations }: ConversationsHeaderProps) => {
    return (
        <UniversalHeaderWrapper>
            <ArrowBack onClick={onBackConversations} />
            <ConversationsTitle {...{ title, firstName, lastName }} />
        </UniversalHeaderWrapper>
    );
};
