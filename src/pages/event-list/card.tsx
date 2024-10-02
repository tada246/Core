import dayjs from 'dayjs';
import { Event } from '../../types/firebase';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Link as NextLink,
} from '@nextui-org/react';
import {
    IoGlobeOutline,
    IoLink,
    IoPulse,
    IoTimeOutline,
} from 'react-icons/io5';
import getEventStatus from '../../features/getEventStatus';
import { Link } from 'react-router-dom';

type EventCardProps = {
    event: Event;
};

export default function EventCard(props: EventCardProps) {
    const { event } = props;
    const startDate = dayjs(new Date(event.date.start.seconds * 1000));
    const endDate = dayjs(new Date(event.date.end.seconds * 1000));

    return (
        <Card className='p-0'>
            <CardBody className='pb-1'>
                <div className='w-full h-48 bg-stone-100 rounded-xl'>
                    <img
                        src={event.imageURL}
                        alt=''
                        className='w-full h-48 object-cover rounded-xl'
                    />
                </div>
                <div className='mt-4'>
                    <div>
                        <p className='text-xl font-bold'>{event.name}</p>
                        <p className='text-sm text-black/60 line-clamp-4'>
                            {event.overview.replace('\n', ' ')}
                        </p>
                    </div>
                    <div className='pl-2 mt-2 flex flex-col gap-1'>
                        <div className='flex gap-2 items-center'>
                            <IoTimeOutline size={16} />
                            <p className='text-sm'>
                                {startDate.format('YYYY年 MM月 DD日')}
                                <span className='pl-2'>
                                    {endDate.diff(startDate, 'hour')}時間
                                </span>
                            </p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <IoLink size={16} />
                            <NextLink
                                isExternal
                                href={event.link}
                                showAnchorIcon
                                className='text-sm'
                            >
                                {event.link}
                            </NextLink>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <IoGlobeOutline size={16} />
                            <p className='text-sm'>
                                {event.isPublic ? '公開' : '非公開'}
                            </p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <IoPulse size={16} />
                            <p className='text-sm'>
                                {getEventStatus({
                                    start: new Date(
                                        event.date.start.seconds * 1000
                                    ),
                                    end: new Date(
                                        event.date.end.seconds * 1000
                                    ),
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className='px-4 pb-4 pt-2'>
                <Button
                    fullWidth
                    as={Link}
                    to={`/map/${event.id}`}
                    color='primary'
                    variant='shadow'
                >
                    編集をする
                </Button>
            </CardFooter>
        </Card>
    );
}
