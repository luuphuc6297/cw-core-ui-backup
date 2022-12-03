import { chain, indexOf, join, last, split, uniq } from 'lodash';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import moment from 'moment-timezone';

const timeArray = ['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '5p', '10p', '11p', '12p'];

export const correctTimeTyping = (time: string) => {
    let epochTime;
    let _time = chain(time).trim().toLower().value();

    if (indexOf(_time, ',') > -1 || indexOf(_time, '.') > -1 || indexOf(_time, ':') > -1) {
        if (indexOf(_time, 'p') > -1) {
            _time = join([split(_time, 'p')[0], '0', 'p'], '');
        } else {
            _time = _time + '0';
        }
    }

    if (indexOf(timeArray, _time) > -1) {
        return `${split(_time, '')[0]}:00 PM`;
    }

    if (moment(_time, 'h:mm A').isValid()) {
        epochTime = moment(_time, 'h:mm A').valueOf();
        return moment(epochTime).format('LT');
    }

    if (moment(_time, 'hh').isValid()) {
        epochTime = moment(_time, 'hh:mm').valueOf();
        return moment(epochTime).format('LT');
    }

    return null;
};

export const formatTime = (time: string) => {
    const fullDate = moment(time).format('dddd D MMMM YYYY');
    const fullTime = moment(time).format('HH:mm');
    return { fullDate, fullTime };
};

export const keepNumberCharacter = (time: string) => {
    return chain(time)
        .toLower()
        .replace(/\s/g, '')
        .replace(/[A-Za-z$-]/g, '')
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') //eslint-disable-line
        .value();
};

export const convertDateTimeToMilliseconds = (date: string | Date, time: string, timezone: string) => {
    if (timezone) {
        return moment
            .tz(moment(date).format('dddd, D MMM YYYY') + ' ' + time, 'dddd, D MMM YYYY hh:mm A', timezone)
            .valueOf();
    }
    return 0;
};

export const convertDateTimeToSeconds = (date: string | Date, time: string, timezone: string) => {
    if (timezone) {
        return (
            moment
                .tz(moment(date).format('dddd, D MMM YYYY') + ' ' + time, 'dddd, D MMM YYYY hh:mm A', timezone)
                .valueOf() / 1000
        );
    }
    return 0;
};

export const calculateTimeZoneDifferenceToLocal = (timezone: string) => {
    const now = moment();
    const localOffset = now.utcOffset();
    now.tz(timezone); // your time zone, not necessarily the server's
    const centralOffset = now.utcOffset();
    const diffInMinutes = localOffset - centralOffset;
    return diffInMinutes * 60;
};

// UTC means Europe (Normally Europe/Lodon have the same time with UTC, but in Daily Saving, Europe have UTC + 1)
export const calculateLocalToUTC = () => {
    const now = moment();
    const localOffset = now.utcOffset();
    now.tz('Europe/London'); // Time on the server always belongs to Europe/London
    const centralOffset = now.utcOffset();
    const diffInMinutes = localOffset - centralOffset;
    return diffInMinutes * 60;
};

export const adjustToTimezone = (time: number, diff: number) => {
    return time + diff;
};

export const _adjustToTimezone = (time: number, diff: number) => {
    return time - diff;
};

export const timeInputArray1 = [
    '12:00 AM',
    '1:00 AM',
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM',
    '6:00 AM',
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM',
];

export const timeInputArray2 = [
    '12:00 AM',
    '12:30 AM',
    '1:00 AM',
    '1:30 AM',
    '2:00 AM',
    '2:30 AM',
    '3:00 AM',
    '3:30 AM',
    '4:00 AM',
    '4:30 AM',
    '5:00 AM',
    '5:30 AM',
    '6:00 AM',
    '6:30 AM',
    '7:00 AM',
    '7:30 AM',
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
    '9:30 PM',
    '10:00 PM',
    '10:30 PM',
    '11:00 PM',
    '11:30 PM',
];

//old function
export const findFirstDayOfWeek = (value: string) => {
    const [date, dateOfWeek] = value.split(' ');
    let firstDate = date;
    if (dateOfWeek === 'Tuesday') {
        firstDate = moment(date, 'DD/MM/YYYY').subtract(1, 'days').format('DD/MM/YYYY');
    } else if (dateOfWeek === 'Wednesday') {
        firstDate = moment(date, 'DD/MM/YYYY').subtract(2, 'days').format('DD/MM/YYYY');
    } else if (dateOfWeek === 'Thursday') {
        firstDate = moment(date, 'DD/MM/YYYY').subtract(3, 'days').format('DD/MM/YYYY');
    } else if (dateOfWeek === 'Friday') {
        firstDate = moment(date, 'DD/MM/YYYY').subtract(4, 'days').format('DD/MM/YYYY');
    } else if (dateOfWeek === 'Saturday') {
        firstDate = moment(date, 'DD/MM/YYYY').subtract(5, 'days').format('DD/MM/YYYY');
    } else if (dateOfWeek === 'Sunday') {
        firstDate = moment(date, 'DD/MM/YYYY').subtract(6, 'days').format('DD/MM/YYYY');
    }
    return firstDate;
};

export const findWeekDates = (date: string) => {
    const defaultDay = last(date.split(' '));
    let firstDate = date;
    switch (defaultDay) {
        case 'Tue':
            firstDate = moment(date, 'YYYY-MM-DD ddd').subtract(1, 'days').format('YYYY-MM-DD ddd');
            break;

        case 'Wed':
            firstDate = moment(date, 'YYYY-MM-DD ddd').subtract(2, 'days').format('YYYY-MM-DD ddd');
            break;

        case 'Thu':
            firstDate = moment(date, 'YYYY-MM-DD ddd').subtract(3, 'days').format('YYYY-MM-DD ddd');
            break;

        case 'Fri':
            firstDate = moment(date, 'YYYY-MM-DD ddd').subtract(4, 'days').format('YYYY-MM-DD ddd');
            break;

        case 'Sat':
            firstDate = moment(date, 'YYYY-MM-DD ddd').subtract(5, 'days').format('YYYY-MM-DD ddd');
            break;

        case 'Sun':
            firstDate = moment(date, 'YYYY-MM-DD ddd').subtract(6, 'days').format('YYYY-MM-DD ddd');
            break;
    }
    const weekDates = [firstDate];
    for (let i = 1; i < 7; i++) {
        weekDates.push(moment(firstDate, 'YYYY-MM-DD ddd').add(i, 'days').format('YYYY-MM-DD ddd'));
    }
    return weekDates;
};

//New function
export const findFirstDateOfWeek = (value: string) => {
    const [date, dateOfWeek] = value.split(' ');
    let firstDate = value;
    switch (dateOfWeek) {
        case 'Tue':
            firstDate = moment(date, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD ddd');
            break;

        case 'Wed':
            firstDate = moment(date, 'YYYY-MM-DD').subtract(2, 'days').format('YYYY-MM-DD ddd');
            break;

        case 'Thu':
            firstDate = moment(date, 'YYYY-MM-DD').subtract(3, 'days').format('YYYY-MM-DD ddd');
            break;

        case 'Fri':
            firstDate = moment(date, 'YYYY-MM-DD').subtract(4, 'days').format('YYYY-MM-DD ddd');
            break;

        case 'Sat':
            firstDate = moment(date, 'YYYY-MM-DD').subtract(5, 'days').format('YYYY-MM-DD ddd');
            break;

        case 'Sun':
            firstDate = moment(date, 'YYYY-MM-DD').subtract(6, 'days').format('YYYY-MM-DD ddd');
            break;
    }
    return firstDate;
};

//input is the first date of current week;
export const findLastWeekDates = (date: string) => {
    const firstLastWeekDate = moment(date, 'YYYY-MM-DD ddd').subtract(7, 'days').format('YYYY-MM-DD ddd');
    const weekDates = [firstLastWeekDate];
    for (let i = 1; i < 7; i++) {
        weekDates.push(moment(firstLastWeekDate, 'YYYY-MM-DD ddd').add(i, 'days').format('YYYY-MM-DD ddd'));
    }
    return weekDates;
};

export const findNextWeekDates = (date: string) => {
    const firstLastWeekDate = moment(date, 'YYYY-MM-DD ddd').add(7, 'days').format('YYYY-MM-DD ddd');
    const weekDates = [firstLastWeekDate];
    for (let i = 1; i < 7; i++) {
        weekDates.push(moment(firstLastWeekDate, 'YYYY-MM-DD ddd').add(i, 'days').format('YYYY-MM-DD ddd'));
    }
    return weekDates;
};

export const findMonthOfWeek = (weekDates: Array<any>) => {
    const monthOfWeek = weekDates.map((weekDate) => {
        return moment(weekDate, 'YYYY-MM-DD ddd').format('MMM YYYY');
    });
    const newMonth = uniq(monthOfWeek);
    if (newMonth.length === 2) {
        return newMonth.join(' - ');
    } else {
        return newMonth[0];
    }
};

export const findFirstDayOfMonth = (month: string, year: string) => {
    const startOfMonth = moment(`${year}-${month}`, 'YYYY-MMM').startOf('month').format('YYYY-MM-DD ddd');
    return startOfMonth;
};

export const findEndDayOfMonth = (month: string, year: string) => {
    const endOfMonth = moment(`${year}-${month}`, 'YYYY-MMM').endOf('month').format('YYYY-MM-DD ddd');
    return endOfMonth;
};

export const findMonthDates = (month: string, year: string) => {
    const firstDayOfMonth = findFirstDayOfMonth(month, year);
    const lastDayOfMonth = findEndDayOfMonth(month, year);

    const firstDay2WeekOfMonth = moment(firstDayOfMonth, 'YYYY-MM-DD ddd').add(7, 'days').format('YYYY-MM-DD ddd');
    const firstDay3WeekOfMonth = moment(firstDay2WeekOfMonth, 'YYYY-MM-DD ddd').add(7, 'days').format('YYYY-MM-DD ddd');
    const firstDay4WeekOfMonth = moment(firstDay3WeekOfMonth, 'YYYY-MM-DD ddd').add(7, 'days').format('YYYY-MM-DD ddd');
    const firstDay5WeekOfMonth = moment(firstDay4WeekOfMonth, 'YYYY-MM-DD ddd').add(7, 'days').format('YYYY-MM-DD ddd');

    const firstWeek = findWeekDates(firstDayOfMonth);
    const secondWeek = findWeekDates(firstDay2WeekOfMonth);
    const thirdWeek = findWeekDates(firstDay3WeekOfMonth);
    const fourthWeek = findWeekDates(firstDay4WeekOfMonth);
    const fifthWeek = findWeekDates(firstDay5WeekOfMonth);
    let lastWeek = [] as any;

    if (moment(lastDayOfMonth, 'YYYY-MM-DD ddd').isAfter(moment(last(fifthWeek), 'YYYY-MM-DD ddd'))) {
        const firstDayLastWeekOfMonth = moment(firstDay5WeekOfMonth, 'YYYY-MM-DD ddd')
            .add(7, 'days')
            .format('YYYY-MM-DD ddd');
        lastWeek = findWeekDates(firstDayLastWeekOfMonth);
    }

    const arrayDatesInMonth = [firstWeek, secondWeek, thirdWeek, fourthWeek, fifthWeek, lastWeek];
    return arrayDatesInMonth;
};

export const calcTime = (time: string) => {
    const now = moment();
    const distance = moment.duration(now.diff(time));
    const asYear = distance.get('years');
    const asDay = distance.get('days');
    const asHour = distance.get('hours');
    const asMin = distance.get('minutes');

    return {
        fullDate: moment(time).format('dddd D MMMM YYYY'),
        date: moment(time).format('D'),
        month: moment(time).format('MMMM'),
        year: moment(time).format('YYYY'),
        time: moment(time).format('HH:mm'),
        asYear,
        asDay,
        asHour,
        asMin,
    };
};

export const formatDistance = (time: string) => {
    const { asYear, asDay, asHour, asMin } = calcTime(time);
    if (asYear > 0) {
        return `${asYear} year`;
    } else if (asDay > 0) {
        return `${asDay} day`;
    } else if (asHour > 0) {
        return `${asHour} hour`;
    } else if (asMin > 0) {
        return `${asMin} minutes`;
    } else {
        return 'now';
    }
};

export const getTimeMess = (createdAtMessage: string) => {
    return moment(createdAtMessage).format('DD MM YYYY');
};

export const getTimeLastMess = (createdAtLastMessage: string) => {
    return createdAtLastMessage ? moment(createdAtLastMessage).format('DD MM YYYY') : '';
};

export const getDurationMessage = (createdAtMessage: string) => {
    return moment(createdAtMessage).fromNow();
};

export const renderTextInMessage = (durationMessage: string, createdAtMessage: string) => {
    if (
        durationMessage.indexOf('hour') !== -1 ||
        durationMessage.indexOf('minute') !== -1 ||
        durationMessage.indexOf('second') !== -1
    ) {
        return 'Today';
    } else if (durationMessage === 'a day ago') {
        return 'Yesterday';
    } else {
        return moment(createdAtMessage).format('DD MMM YYYY');
    }
};

export const formatTimeForListConversation = (createdAtLastMessage: string) => {
    const numberDiffDay = moment(createdAtLastMessage).diff(moment.now(), 'd');

    if (numberDiffDay > 0) {
        return '';
    } else {
        if (numberDiffDay === 0) {
            return moment(createdAtLastMessage).format('h:m A');
        } else if (numberDiffDay > 0 || numberDiffDay < 6) {
            return moment(createdAtLastMessage).format('ddd');
        }
        return moment(createdAtLastMessage).format('D/M/YY');
    }
};
