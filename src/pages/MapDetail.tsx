import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Event } from '../type/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../features/firebase';
import {
    Button,
    Chip,
    Input,
    Link as NextLink,
    Image as NextImage,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import {
    IoEarth,
    IoInformation,
    IoInformationOutline,
    IoLink,
    IoMedicalSharp,
    IoPencilSharp,
} from 'react-icons/io5';
import { useForm } from 'react-hook-form';

export default function MapDetail() {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        if (id) {
            onSnapshot(doc(db, 'events', id), (doc) => {
                const currentEventData = doc.data() as Event;
                setEvent(currentEventData);
            });
        }
    }, [id]);

    console.log(event);

    if (!event) {
        return <p>ロード中...</p>;
    }
    return (
        <div>
            <MapTopInfo event={event} />
            <div className='mt-16'>
                <EditInfo event={event} />
            </div>
        </div>
    );
}

type CommonProps = {
    event: Event;
};

function MapTopInfo(props: CommonProps) {
    const { event } = props;
    const startDate = dayjs(new Date(event.date.start.seconds * 1000));
    const endDate = dayjs(new Date(event.date.end.seconds * 1000));

    return (
        <div className='w-full'>
            <div className='relative w-full h-96'>
                <NextImage
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
                        {event.explanation}
                    </p>
                </div>
            </div>
            <div className='flex gap-2 mt-3 w-full overflow-x-auto'>
                <Chip color='primary' variant='flat'>
                    {event.isPublic ? '公開' : '非公開'}
                </Chip>
                <Chip color='default' variant='flat'>
                    {startDate.format('YYYY年 MM月 DD日')}
                </Chip>
                <Chip color='default' variant='flat'>
                    {endDate.diff(startDate, 'hour')}時間
                </Chip>
            </div>
        </div>
    );
}

type EditInfoProps = {
    event: Event;
};

function EditInfo(props: EditInfoProps) {
    const { event } = props;

    return (
        <div className='flex flex-col gap-4 bg-slate-100 px-6 py-4 rounded-lg'>
            <EditName event={event} />
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <div>
                        <IoInformation size={20} />
                    </div>
                    <div>
                        <p className='text-sm text-black/60'>説明</p>
                        <p className='text-md font-semibold'>
                            {event.explanation}
                        </p>
                    </div>
                </div>
                <div>
                    <Button isIconOnly size='sm' variant='flat'>
                        <IoPencilSharp size={18} />
                    </Button>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <div>
                        <IoEarth size={20} />
                    </div>
                    <div>
                        <p className='text-sm text-black/60'>公開・非公開</p>
                        <p className='text-md font-semibold'>
                            {event.isPublic ? '公開' : '非公開'}
                        </p>
                    </div>
                </div>
                <div>
                    <Button isIconOnly size='sm' variant='flat'>
                        <IoPencilSharp size={18} />
                    </Button>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <div>
                        <IoLink size={20} />
                    </div>
                    <div>
                        <p className='text-sm text-black/60'>リンク</p>
                        <NextLink
                            isExternal
                            href={event.link}
                            showAnchorIcon
                            className='text-md font-semibold'
                        >
                            {event.link}
                        </NextLink>
                    </div>
                </div>
                <div>
                    <Button isIconOnly size='sm' variant='flat'>
                        <IoPencilSharp size={18} />
                    </Button>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <div>
                        <IoInformation size={20} />
                    </div>
                    <div>
                        <p className='text-sm text-black/60'>説明</p>
                        <p className='text-md font-semibold'>
                            {event.explanation}
                        </p>
                    </div>
                </div>
                <div>
                    <Button isIconOnly size='sm' variant='flat'>
                        <IoPencilSharp size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

type CommonEditInfoProps = {
    event: Event;
};

type CommonEditInfoModalProps = {
    name: string;
    onOpen: () => void;
    value: React.ReactNode;
    icon: React.ReactNode;
};

function CommonInformation(props: CommonEditInfoModalProps) {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-4'>
                <div>{props.icon}</div>
                <div>
                    <p className='text-sm text-black/60'>{props.name}</p>
                    {props.value}
                </div>
            </div>
            <div>
                <Button
                    isIconOnly
                    size='sm'
                    variant='flat'
                    onClick={props.onOpen}
                >
                    <IoPencilSharp size={18} />
                </Button>
            </div>
        </div>
    );
}

const COMMON_INFO_NAME_CLASS = 'text-md font-semibold';

function EditName(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit } = useForm();

    const update = async (data: { name: string }) => {
        await updateDoc(doc(db, 'events', 'DC'), {
            name: data.name,
        });
    };

    const onSubmit = (data: { name: string }) => {
        console.log(data);
    };

    return (
        <>
            <CommonInformation
                name='名前'
                onOpen={onOpen}
                value={<p className={COMMON_INFO_NAME_CLASS}>{event.name}</p>}
                icon={<IoMedicalSharp size={20} />}
            />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalHeader className='flex flex-col gap-1'>
                                名前の変更
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    type='text'
                                    label='新しい名前'
                                    defaultValue={event.name}
                                    {...register('name')}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
                                    キャンセル
                                </Button>
                                <Button
                                    color='primary'
                                    variant='shadow'
                                    type='submit'
                                >
                                    変更
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
