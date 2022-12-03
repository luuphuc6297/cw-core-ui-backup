import { get, head, isString, split, upperCase } from 'lodash';
import { Message } from '../models';

export const getQueryParam = (query: string) => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(query) as string;
    return value;
};

export const extractContent = (s: string) => {
    const span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
};

export const isWhitespace = (s: string) => {
    if (isString(s)) {
        return s.indexOf(' ') >= 0;
    }
    return false;
};

// export const rejectTimeout = (reason: string, delay: number) => {
//     return new Promise((r, reject) => setTimeout(() => reject(reason), delay));
// };

export const handleGreeting = (currentHour: number) => {
    let greeting;
    if (currentHour > 0 && currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour <= 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    return greeting;
};

export const getShortName = (name: string) => {
    return upperCase(head(split(name, '')));
};

export const stringToColor = function (str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
};

export const timeout = (ms: any) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isActiveHotKey = (e: KeyboardEvent) => {
    return e.shiftKey || e.ctrlKey || e.metaKey;
};

export const getCreatedAtLastMessage = (lastMessage: any) => {
    return get(lastMessage, 'meta.createdAt', '');
};

export const getUserIdFormMessage = (message: Message) => {
    return get(message, 'attributes.user._id', '');
};

export const getUserIdFormLastMessage = (lastMessage: any) => {
    return get(lastMessage, 'attributes.user._id', '');
};

export const getFullName = (message: Message) => {
    const { firstName, lastName }: string | any = get(message, 'attributes.user', {});

    return `${firstName} ${lastName}`;
};
