import dayjs from 'dayjs';
import { Event } from '../../types/firebase';
import { Chip, Image } from '@nextui-org/react';
import getEventStatus from '../../features/getEventStatus';

type Props = {
    event: Event;
};

export default function MapTopInfo(props: Props) {
    const { event } = props;
    const startDate = dayjs(new Date(event.date.start.seconds * 1000));
    const endDate = dayjs(new Date(event.date.end.seconds * 1000));

    return (
        <div className='w-full'>
            <div className='relative w-full h-96'>
                <Image
                    src={event.imageURL}
                    alt=''
                    width='w-full'
                    className='w-full h-96 object-cover absolute top-0 left-0 z-0'
                    isBlurred
                />
                <div className='absolute bottom-0 left-0 w-full z-10 p-8 bg-gradient-to-t from-black/60 to-black/10 rounded-xl'>
                    <p className='text-4xl font-bold text-white line-clamp-1'>
                        {event.name}
                    </p>
                    <p className='text-sm text-white line-clamp-1 mt-1'>
                        {event.overview}
                    </p>
                </div>
            </div>
            <div className='flex gap-2 mt-3 w-full overflow-x-auto'>
                <Chip color='primary' variant='flat'>
                    {event.isPublic ? '公開' : '非公開'}
                </Chip>
                <Chip color='primary' variant='flat'>
                    {getEventStatus({
                        start: new Date(event.date.start.seconds * 1000),
                        end: new Date(event.date.end.seconds * 1000),
                    })}
                </Chip>
                <Chip color='default' variant='flat'>
                    {startDate.format('YYYY年 MM月 DD日')}
                </Chip>
                <Chip color='default' variant='flat'>
                    {endDate.diff(startDate, 'hour')}時間
                </Chip>
            </div>
            <div className='mt-3'>
                <p className='text-tiny opacity-60'>{event.id}</p>
            </div>
        </div>
    );
}
