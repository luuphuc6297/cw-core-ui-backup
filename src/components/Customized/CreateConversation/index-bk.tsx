import { UniversalBodyWrapper } from 'components';
import { CreateConversationForm } from 'models';

interface CreateConversationProps {
    children: React.ReactNode;
}

export const CreateConversationContainer = ({ children }: CreateConversationProps) => {
    const initialValues: CreateConversationForm = {
        title: '',
    } as CreateConversationForm;

    const handleCreateConversation = async (formValues: CreateConversationForm) => {
        console.log('abc');
    };

    const renderCreateConversationPage = () => {
        console.log('abc');
    };

    return <UniversalBodyWrapper>{children}</UniversalBodyWrapper>;
};
