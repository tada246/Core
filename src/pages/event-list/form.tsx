import { Button, Input, Textarea, useDisclosure } from '@nextui-org/react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { db } from '../../features/firebase';
import { Event } from '../../types/firebase';
import toast from 'react-hot-toast';
import { IoAddCircleOutline } from 'react-icons/io5';
import EditorModal from '../../components/ui/EditorModal';
import WarningCard from '../../components/ui/WarningCard';

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

export default function AddNewEvent(props: AddNewEventProps) {
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
                isStampRallyEnabled: false,
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
                    description='マップイベントの内容を入力してください'
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
