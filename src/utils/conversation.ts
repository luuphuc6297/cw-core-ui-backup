const indexingListConversation = (listConversation: any) => {
    const indexing = listConversation.reduce(
        (acc: any, curr: any, currentIndex: number) => ((acc[curr._id] = listConversation[currentIndex]), acc),
        {}
    );
    return indexing;
};

export const sortConversationByConversationId = (listConversation: any, conversationId: string) => {
    const cloneConversation: any = {};

    const listConversationObject = indexingListConversation(listConversation);

    if (!conversationId) {
        return listConversationObject;
    }

    const conversationById = listConversationObject[conversationId];

    delete listConversationObject[conversationId];

    cloneConversation[conversationId] = conversationById;

    return { ...cloneConversation, ...listConversationObject };
};

export const splitTitleConversationByUser = ({
    totalUser,
    titleChat,
    firstName,
    lastName,
}: {
    totalUser: number;
    titleChat: string;
    firstName: string;
    lastName: string;
}) => {
    let firstCharacter = firstName;
    let lastCharacter = lastName;
    if (totalUser > 2) {
        const splitTitleGroup = titleChat.split(' ');
        firstCharacter = splitTitleGroup[0] || '';
        lastCharacter = splitTitleGroup[splitTitleGroup.length - 1] || '';
    }
    return {
        firstCharacter,
        lastCharacter,
    };
};
