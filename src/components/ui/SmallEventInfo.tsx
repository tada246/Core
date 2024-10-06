import { useParams } from 'react-router-dom';
import useEventList from '../../hooks/useEventList';
import { Chip, Image } from '@nextui-org/react';
import getEventStatus from '../../features/getEventStatus';
import dayjs from 'dayjs';

type Props = {
    className?: string;
    smallText: string;
    tags?: string[];
    isStampRally?: boolean;
};

export default function SmallEventInfo(props: Props) {
    const { data } = useEventList();
    const { id: eventId } = useParams<{ id: string | undefined }>();
    const event = data?.find((event) => event.id === eventId);
    const isStampRally = props.isStampRally || false;

    if (!data || !eventId || !event)
        return (
            <NotEventDataEventInfo
                smallText={props.smallText}
                tags={props.tags}
            />
        );

    const startDate = dayjs(new Date(event.date.start.seconds * 1000));

    return (
        <div className='flex gap-6 items-center min-h-24'>
            <div className='flex-1'>
                <p className='text-3xl font-bold'>{props.smallText}</p>
                <p>{event.name}</p>
                <div className='flex gap-2 mt-2 w-full flex-wrap'>
                    <Chip color='primary' variant='flat' size='sm'>
                        {event.isPublic ? '公開' : '非公開'}
                    </Chip>
                    <Chip color='primary' variant='flat' size='sm'>
                        {getEventStatus({
                            start: new Date(event.date.start.seconds * 1000),
                            end: new Date(event.date.end.seconds * 1000),
                        })}
                    </Chip>
                    {isStampRally && (
                        <Chip color='secondary' variant='flat' size='sm'>
                            {event.isStampRallyEnabled
                                ? 'スタンプラリー機能は有効です'
                                : 'スタンプラリー機能は使えません'}
                        </Chip>
                    )}
                    <Chip color='default' variant='flat' size='sm'>
                        {startDate.format('YYYY年 MM月 DD日')}
                    </Chip>
                    {props.tags?.map((tag) => (
                        <Chip
                            key={tag}
                            color='default'
                            variant='flat'
                            size='sm'
                        >
                            {tag}
                        </Chip>
                    ))}
                </div>
            </div>
            <Image
                className='w-24 h-24 object-cover object-center'
                radius='full'
                src={event.imageURL}
                isBlurred
            />
        </div>
    );
}

function NotEventDataEventInfo({
    smallText,
    tags,
}: {
    smallText: string;
    tags?: string[];
}) {
    return (
        <div className='h-24 flex items-center'>
            <p className='text-3xl font-bold'>{smallText}</p>
            <p>イベントデータが読み込まれませんでした。</p>
            {tags && (
                <div className='flex gap-2 mt-2 w-full overflow-x-auto'>
                    {tags.map((tag) => (
                        <Chip
                            key={tag}
                            color='default'
                            variant='flat'
                            size='sm'
                        >
                            {tag}
                        </Chip>
                    ))}
                </div>
            )}
        </div>
    );
}
