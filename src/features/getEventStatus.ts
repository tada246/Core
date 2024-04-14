import dayjs from 'dayjs';

type EventDate = {
    start: Date;
    end: Date;
};

export default function getEventStatus(date: EventDate) {
    const now = dayjs();
    const start = dayjs(date.start);
    const end = dayjs(date.end);

    if (now.isBefore(start)) {
        return '開催前';
    } else if (now.isAfter(end)) {
        return '終了';
    } else {
        return '開催中';
    }
}
