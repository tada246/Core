import ImageExpansion from '../../../components/ui/ImaegExpansion';
import AddStampRally from './add';
import StampRallyKeyModal from './key';
import EditStampRally from './edit';
import { StampRally } from '../../../types/firebase';

type Props = {
    eventId: string;
    stampRally: StampRally[];
};

export default function StampRallyEditor(props: Props) {
    return (
        <div className='shadow-medium p-4 rounded-medium'>
            <AddStampRally eventId={props.eventId} />
            <div className='flex flex-col gap-4 mt-6'>
                {props.stampRally.length === 0 && (
                    <p className='text-center py-6 text-default-600'>
                        何もありません
                    </p>
                )}
                {props.stampRally.map((stampRally) => (
                    <div
                        key={stampRally.id}
                        className='flex gap-4 items-center'
                    >
                        <ImageExpansion
                            src={stampRally.imageURL}
                            width={48}
                            height={48}
                            alt='stampRally'
                            className='w-12 h-12 object-cover ring-2 ring-primary-300'
                            radius='full'
                            classNames={{
                                wrapper: 'w-12 h-12',
                                img: 'w-12 h-12',
                            }}
                        />
                        <div className='flex-1'>
                            <p className='font-bold'>{stampRally.name}</p>
                            <p className='text-sm'>ヒント：{stampRally.hint}</p>
                            <p className='text-sm'>順番：{stampRally.order}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <EditStampRally
                                eventId={props.eventId}
                                preStampRally={stampRally}
                            />
                            <StampRallyKeyModal
                                eventId={props.eventId}
                                stampRally={stampRally}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
