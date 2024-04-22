import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Entertainment, Floor } from '../../types/firebase';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../../features/firebase';
import toast from 'react-hot-toast';
import {
    Button,
    Chip,
    Image,
    Input,
    Textarea,
    useDisclosure,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { IoAddCircleOutline, IoPencil, IoTrash } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import EditorModal from '../../components/ui/EditorModal';
import OnlyEditors from '../../components/ui/OnlyEditors';
import Head from '../../components/ui/Head';

export default function Page() {
    const params = useParams<{ id: string; place_id: string }>();
    const [place, setPlace] = useState<Floor[]>([]);

    async function getPlaceData() {
        if (params.id && params.place_id) {
            onSnapshot(
                query(
                    collection(
                        db,
                        'events',
                        params.id,
                        'places',
                        params.place_id,
                        'floor'
                    ),
                    orderBy('order', 'asc')
                ),
                (doc) => {
                    const _places: Floor[] = [];
                    doc.forEach((item) => {
                        _places.push(item.data() as Floor);
                    });
                    setPlace(_places);
                }
            );
        }
    }

    useEffect(() => {
        getPlaceData().catch(() => {
            toast.error('データの取得に失敗');
        });
    }, [params]);

    if (!params.id || !params.place_id) return <></>;

    return (
        <div>
            <Head
                title={'催し物と階層の編集'}
                subtitle={`${params.id} - ${params.place_id} の催し物と階層を編集します。`}
            />
            <div className='flex flex-col gap-8 mt-6'>
                {place.map((item) => (
                    <div
                        key={item.id}
                        className='p-6 rounded-large shadow-medium'
                    >
                        <div className='flex gap-6 items-center'>
                            <div className='flex gap-3 flex-col'>
                                <div className='w-8 h-8 flex items-center justify-center bg-primary-400 text-white rounded-small'>
                                    <p className='text-sm'>{item.order}</p>
                                </div>
                            </div>
                            <div className='flex-1'>
                                <h1 className='text-xl font-bold'>
                                    {item.name}
                                </h1>
                                <p className='text-tiny opacity-60'>
                                    ID: {item.id}
                                </p>
                            </div>
                        </div>
                        <EventList
                            place_id={params.place_id ?? ''}
                            event_id={params.id ?? ''}
                            floor_id={item.id}
                        />
                    </div>
                ))}
                <OnlyEditors>
                    <AddNewFloor
                        event_id={params.id}
                        place_id={params.place_id}
                    />
                </OnlyEditors>
            </div>
        </div>
    );
}

type EventListProps = {
    place_id: string;
    // ⇩ 行事のID
    event_id: string;
    floor_id: string;
};

function EventList(props: EventListProps) {
    const [events, setEvents] = useState<Entertainment[]>([]);

    async function getEventData() {
        onSnapshot(
            query(
                collection(
                    db,
                    'events',
                    props.event_id,
                    'places',
                    props.place_id,
                    'floor',
                    props.floor_id,
                    'events'
                ),
                orderBy('date.start', 'asc')
            ),
            (doc) => {
                const _events: Entertainment[] = [];
                doc.forEach((item) => {
                    _events.push(item.data() as Entertainment);
                });
                setEvents(_events);
            }
        );
    }

    async function deleteEvent(id: string) {
        await deleteDoc(
            doc(
                db,
                'events',
                props.event_id,
                'places',
                props.place_id,
                'floor',
                props.floor_id,
                'events',
                id
            )
        )
            .then(() => {
                toast.success('削除に成功');
            })
            .catch(() => {
                toast.error('削除に失敗');
            });
    }

    useEffect(() => {
        getEventData().catch(() => {
            toast.error('フォームの取得に失敗');
        });
    }, []);

    return (
        <div className='flex flex-col gap-4 mt-4'>
            {events.map((item) => (
                <div
                    key={item.id}
                    className='flex gap-4 rounded-large shadow-small p-6 bg-white items-start outline-1 outline-black/10'
                >
                    <div className='flex flex-col gap-3'>
                        <div className='w-8 h-8 flex items-center justify-center bg-secondary-300 text-white rounded-small'>
                            <p className='text-sm'>{item.order}</p>
                        </div>
                        <OnlyEditors>
                            <EditExistEvent
                                event_id={props.event_id}
                                place_id={props.place_id}
                                floor_id={props.floor_id}
                                entertainment_id={item.id}
                                info={{
                                    name: item.name,
                                    explanation: item.explanation,
                                    imageURL: item.imageURL,
                                    order: item.order,
                                    overview: item.overview,
                                    date: {
                                        start: dayjs(
                                            item.date.start.seconds * 1000
                                        ).format('YYYY-MM-DDTHH:mm'),
                                        end: dayjs(
                                            item.date.end.seconds * 1000
                                        ).format('YYYY-MM-DDTHH:mm'),
                                    },
                                }}
                            />
                            <Button
                                className='w-8 h-8'
                                size='sm'
                                isIconOnly
                                variant='flat'
                                onClick={() => deleteEvent(item.id)}
                            >
                                <IoTrash />
                            </Button>
                        </OnlyEditors>
                    </div>
                    <div className='flex-1'>
                        <div className='flex gap-3 items-center'>
                            <div>
                                <Image
                                    src={item.imageURL}
                                    width={120}
                                    height={120}
                                    className='w-16 h-16 rounded-large bg-cover bg-center'
                                />
                            </div>
                            <div>
                                <h2 className='font-bold w-full line-clamp-1 text-lg'>
                                    {item.name}
                                </h2>
                                <p className='text-sm -mt-1 text-default-600 w-full line-clamp-1'>
                                    {item.overview}
                                    {item.overview.length == 0 && (
                                        <span className='text-danger/60'>
                                            見出しがありません...
                                        </span>
                                    )}
                                </p>
                                <div className='flex gap-2 mt-1'>
                                    <Chip
                                        variant='flat'
                                        size='sm'
                                        className='text-tiny px-2'
                                    >
                                        {dayjs(
                                            item.date.start.seconds * 1000
                                        ).format('YYYY/MM/DD HH:mm')}
                                    </Chip>
                                    <Chip
                                        variant='flat'
                                        size='sm'
                                        className='text-tiny px-2'
                                    >
                                        {dayjs(
                                            item.date.end.seconds * 1000
                                        ).diff(
                                            dayjs(
                                                item.date.start.seconds * 1000
                                            ),
                                            'minute'
                                        )}
                                        分間
                                    </Chip>
                                </div>
                            </div>
                        </div>
                        <div className='text-sm line-clamp-2 mt-3 border-1 border-default-300 p-2 rounded-medium'>
                            {item.explanation}
                            {item.explanation.length == 0 && (
                                <span className='text-danger/60'>
                                    説明がありません！
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <OnlyEditors>
                <AddNewEvent
                    event_id={props.event_id}
                    place_id={props.place_id}
                    floor_id={props.floor_id}
                />
            </OnlyEditors>
        </div>
    );
}

type AddNewFloorForm = {
    id: string;
    name: string;
    order: number;
};

type AddNewFloorProps = {
    event_id: string;
    place_id: string;
};

function AddNewFloor(props: AddNewFloorProps) {
    const { isOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, reset } = useForm<AddNewFloorForm>();

    const createNewMap = async (data: AddNewFloorForm) => {
        await setDoc(
            doc(
                db,
                'events',
                props.event_id,
                'places',
                props.place_id,
                'floor',
                data.id
            ),
            {
                id: data.id,
                name: data.name,
                order: parseInt(data.order.toString()),
            }
        );
    };

    const onSubmit = (data: AddNewFloorForm) => {
        if (!/^[a-zA-Z0-9]+$/.test(data.id)) {
            toast.error('IDは半角英数字のみです');
            return;
        }
        createNewMap(data)
            .then(() => {
                onOpenChangeModal();
                toast.success('追加に成功');
            })
            .catch((_) => {
                toast.error('追加に失敗');
            });
    };

    const onOpenChangeModal = () => {
        reset();
        onOpenChange();
    };

    return (
        <>
            <Button
                fullWidth
                onClick={onOpenChangeModal}
                startContent={<IoAddCircleOutline />}
            >
                新しい階層を追加
            </Button>
            <EditorModal
                isOpen={isOpen}
                onOpenChange={onOpenChangeModal}
                title='新しい階層の追加'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoComplete='off'
                    type='text'
                    label='ID'
                    {...register('id')}
                    description='階層のID。英数字のみです。'
                    isRequired
                />
                <Input
                    autoComplete='off'
                    type='text'
                    label='名前'
                    {...register('name')}
                    description='階層の名前。例: 1階, 2階, 3階。'
                />
                <Input
                    autoComplete='off'
                    type='number'
                    label='順番'
                    {...register('order')}
                    description='数字が小さいほど上に表示されます。'
                    isRequired
                />
            </EditorModal>
        </>
    );
}

type AddNewEventProps = {
    event_id: string;
    place_id: string;
    floor_id: string;
};

type EditMapInfoForm = {
    name: string;
    explanation: string;
    imageURL: string;
    order: number;
    overview: string;
    date: {
        start: string;
        end: string;
    };
};

function AddNewEvent(props: AddNewEventProps) {
    const { isOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, reset } = useForm<EditMapInfoForm>();

    const createNewMap = async (data: EditMapInfoForm) => {
        const newId = uuidv4();
        await setDoc(
            doc(
                db,
                'events',
                props.event_id,
                'places',
                props.place_id,
                'floor',
                props.floor_id,
                'events',
                newId
            ),
            {
                id: newId,
                name: data.name,
                explanation: data.explanation,
                imageURL: data.imageURL,
                order: parseInt(data.order.toString()),
                overview: data.overview,
                date: {
                    start: new Date(data.date.start),
                    end: new Date(data.date.end),
                },
            }
        );
    };

    const onSubmit = (data: EditMapInfoForm) => {
        createNewMap(data)
            .then(() => {
                onOpenChangeModal();
                toast.success('追加に成功');
            })
            .catch((_) => {
                toast.error('追加に失敗');
            });
    };

    const onOpenChangeModal = () => {
        reset();
        onOpenChange();
    };

    return (
        <>
            <Button
                fullWidth
                onClick={onOpenChangeModal}
                startContent={<IoAddCircleOutline />}
            >
                新しい催し物を追加
            </Button>
            <EditorModal
                isOpen={isOpen}
                onOpenChange={onOpenChangeModal}
                title='新しい催し物の追加'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoComplete='off'
                    type='text'
                    label='名前'
                    {...register('name')}
                    isRequired
                />
                <Input
                    autoComplete='off'
                    label='見出し'
                    {...register('overview')}
                />
                <Textarea
                    autoComplete='off'
                    label='説明'
                    {...register('explanation')}
                />
                <div className='flex gap-2'>
                    <Input
                        autoComplete='off'
                        type='datetime-local'
                        label='開始時刻'
                        {...register('date.start')}
                        isRequired
                    />
                    <Input
                        autoComplete='off'
                        type='datetime-local'
                        label='終了時刻'
                        isRequired
                        {...register('date.end')}
                    />
                </div>
                <Input
                    autoComplete='off'
                    type='text'
                    label='画像URL'
                    {...register('imageURL')}
                    isRequired
                    description='リンクは、必ず「https://」から始まるURLを入力してください。'
                />
                <Input
                    autoComplete='off'
                    type='number'
                    label='順番'
                    {...register('order')}
                    description='数字が小さいほど上に表示されます。'
                    isRequired
                />
            </EditorModal>
        </>
    );
}

type EditExistEventProps = {
    event_id: string;
    place_id: string;
    floor_id: string;
    entertainment_id: string;
    info: EditMapInfoForm;
};

function EditExistEvent(props: EditExistEventProps) {
    const { isOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, reset } = useForm<EditMapInfoForm>();

    const updateExistMap = async (data: EditMapInfoForm) => {
        await updateDoc(
            doc(
                db,
                'events',
                props.event_id,
                'places',
                props.place_id,
                'floor',
                props.floor_id,
                'events',
                props.entertainment_id
            ),
            {
                id: props.entertainment_id,
                name: data.name,
                explanation: data.explanation,
                imageURL: data.imageURL,
                order: parseInt(data.order.toString()),
                overview: data.overview,
                date: {
                    start: new Date(data.date.start),
                    end: new Date(data.date.end),
                },
            }
        );
    };

    const updateFormValue = () => {
        reset({
            name: props.info.name,
            explanation: props.info.explanation,
            imageURL: props.info.imageURL,
            order: props.info.order,
            overview: props.info.overview,
            date: {
                start: dayjs(props.info.date.start).format('YYYY-MM-DDTHH:mm'),
                end: dayjs(props.info.date.end).format('YYYY-MM-DDTHH:mm'),
            },
        });
    };

    useEffect(() => {
        updateFormValue();
    }, [props.info]);

    const onSubmit = (data: EditMapInfoForm) => {
        updateExistMap(data)
            .then(() => {
                onOpenChangeModal();
                toast.success('編集に成功');
            })
            .catch((_) => {
                toast.error('編集に失敗');
            });
    };

    const onOpenChangeModal = () => {
        reset();
        updateFormValue();
        onOpenChange();
    };

    return (
        <>
            <Button
                onClick={onOpenChangeModal}
                isIconOnly
                className='w-8 h-8'
                size='sm'
                variant='flat'
            >
                <IoPencil />
            </Button>
            <EditorModal
                isOpen={isOpen}
                onOpenChange={onOpenChangeModal}
                title='存在している催し物の編集'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoComplete='off'
                    type='text'
                    label='名前'
                    {...register('name')}
                    isRequired
                />
                <Input
                    autoComplete='off'
                    label='見出し'
                    {...register('overview')}
                />
                <Textarea
                    autoComplete='off'
                    label='説明'
                    {...register('explanation')}
                />
                <div className='flex gap-2'>
                    <Input
                        autoComplete='off'
                        type='datetime-local'
                        label='開始時刻'
                        {...register('date.start')}
                        isRequired
                    />
                    <Input
                        autoComplete='off'
                        type='datetime-local'
                        label='終了時刻'
                        isRequired
                        {...register('date.end')}
                    />
                </div>
                <Input
                    autoComplete='off'
                    type='text'
                    label='画像URL'
                    {...register('imageURL')}
                    isRequired
                    description='リンクは、必ず「https://」から始まるURLを入力してください。'
                />
                <Input
                    autoComplete='off'
                    type='number'
                    label='順番'
                    {...register('order')}
                    description='数字が小さいほど上に表示されます。'
                    isRequired
                />
            </EditorModal>
        </>
    );
}
