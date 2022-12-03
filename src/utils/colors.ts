import { Colors } from 'utils';

export const getRandomColor = () => {
    return Colors[Math.floor(Math.random() * (Colors.length - 1))];
};
