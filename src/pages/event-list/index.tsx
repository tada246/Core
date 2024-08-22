import {
    IoAddCircleOutline,
    IoGlobeOutline,
    IoLink,
    IoMapOutline,
    IoPulse,
    IoTimeOutline,
} from 'react-icons/io5';
import useEventList from '../../hooks/useEventList';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Input,
    Link as NextLink,
    Textarea,
    useDisclosure,
} from '@nextui-org/react';
import { Event } from '../../types/firebase';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Head from '../../components/ui/Head';
import getEventStatus from '../../features/getEventStatus';
import { useForm } from 'react-hook-form';
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../features/firebase';
import toast from 'react-hot-toast';
import EditorModal from '../../components/ui/EditorModal';
import WarningCard from '../../components/ui/WarningCard';
import OnlyAdmin from '../../components/ui/OnlyAdmin';

// 🦊
export default function Page() {
    return (
        <div>
            <Head
                icon={<IoMapOutline size={24} />}
                title='マップイベント'
                subtitle='TANE Mapでのマップイベントを編集できます。'
            />
            <div className='mt-10'>
                <div>
                    <p className='text-xl font-bold'>行事を選択</p>
                    <p className='text-sm opacity-80'>
                        各行事のマップをするためには、行事を選択してください。
                    </p>
                </div>
                <EventTable />
            </div>
        </div>
    );
}

function EventTable() {
    const { data, isLoading, error, mutate } = useEventList();

    if (isLoading || !data) {
        return <p className='mt-8 text-center'>ロード中...</p>;
    }
    if (error) {
        return <p className='mt-8 text-center'>エラーが発生しました。</p>;
    }

    function addSWRegistration(event: Event) {
        if (!data) return;

        mutate([...data, event]);
    }

    return (
        <>
            <OnlyAdmin>
                <AddNewEvent addSWRegistration={addSWRegistration} />
            </OnlyAdmin>
            <div className='mt-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {data?.map((d) => (
                    <EventCard key={d.id} event={d} />
                ))}
            </div>
        </>
    );
}

type EventCardProps = {
    event: Event;
};

function EventCard(props: EventCardProps) {
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

type EventEditState = {
    id: string;
    name: string;
    link: string;
    date: {
        start: string;
        end: string;
    };
    imageURL: string;
    overview: string;
    mapImageURL: string;
};

type AddNewEventProps = {
    addSWRegistration: (event: Event) => void;
};

function AddNewEvent(props: AddNewEventProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, reset } = useForm<EventEditState>();

    const addNewEvent = async (data: EventEditState) => {
        await setDoc(doc(db, 'events', data.id), {
            id: data.id,
            isPublic: false,
            name: data.name,
            link: data.link,
            date: {
                start: new Date(data.date.start),
                end: new Date(data.date.end),
            },
            imageURL: data.imageURL,
            overview: data.overview,
            mapImageURL: data.mapImageURL,
        });
    };

    const getNewEvent = async (id: string) => {
        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            if (!data) return;

            const event: Event = {
                id: data.id,
                isPublic: data.isPublic,
                name: data.name,
                link: data.link,
                date: {
                    start: data.date.start as Timestamp,
                    end: data.date.end as Timestamp,
                },
                imageURL: data.imageURL,
                overview: data.overview,
                mapImageURL: data.mapImageURL,
            };

            props.addSWRegistration(event);
        }
    };

    const onFormSubmit = async (data: EventEditState) => {
        if (!/^[a-zA-Z0-9\-]+$/.test(data.id)) {
            toast.error('IDは半角英数字のみです');
            return;
        }

        await addNewEvent(data)
            .then(() => {
                toast.success('マップイベントの新規追加に成功');
                reset();
                onOpenChange();
                getNewEvent(data.id);
            })
            .catch(() => {
                toast.error('マップイベントの新規追加に失敗');
            });
    };

    const openModal = () => {
        reset();
        onOpen();
    };

    return (
        <>
            <Button
                onPress={openModal}
                fullWidth
                startContent={<IoAddCircleOutline />}
                className='mt-4'
            >
                マップイベントの新規追加
            </Button>
            <EditorModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title='マップイベントを新規追加'
                onSubmit={handleSubmit(onFormSubmit)}
                isAdding
            >
                <WarningCard
                    message='注意'
                    description='一度作成すると削除できません。'
                    className='mb-4'
                />
                <Input
                    label='ID'
                    {...register('id')}
                    autoComplete='off'
                    isRequired
                    description='マップイベントのIDを入力してください'
                />
                <Input
                    label='名前'
                    {...register('name')}
                    autoComplete='off'
                    isRequired
                    description='マップイベントの名前を入力してください'
                />
                <Textarea
                    label='見出し'
                    autoComplete='off'
                    {...register('overview')}
                    isRequired
                    description='アンケートの内容を入力してください'
                />
                <Input
                    autoComplete='off'
                    label='リンク'
                    {...register('link')}
                    isRequired
                    description='マップイベントのリンクを入力してください（https://から始まるもの）'
                />
                <Input
                    autoComplete='off'
                    label='画像URL'
                    {...register('imageURL')}
                    isRequired
                    description='マップイベントの画像URLを入力してください'
                />
                <Input
                    autoComplete='off'
                    label='マップ画像URL'
                    {...register('mapImageURL')}
                    isRequired
                    description='マップイベントのマップ画像URLを入力してください'
                />
                <div className='flex gap-2'>
                    <Input
                        autoComplete='off'
                        label='開始日時'
                        type='datetime-local'
                        {...register('date.start')}
                        isRequired
                        description='マップイベントの開始日時を入力してください'
                    />
                    <Input
                        autoComplete='off'
                        label='終了日時'
                        type='datetime-local'
                        {...register('date.end')}
                        isRequired
                        description='マップイベントの終了日時を入力してください'
                    />
                </div>
            </EditorModal>
        </>
    );
}
