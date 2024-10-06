import { Button, Input, useDisclosure } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { StampRallyForm } from './props';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { IoAddCircleOutline } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';
import { nanoid } from 'nanoid';

type Props = {
    eventId: string;
};

export default function AddStampRally(props: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, reset } = useForm<StampRallyForm>();

    const addNewStampRally = async (data: StampRallyForm) => {
        const stampRallyId = uuidv4();
        await setDoc(
            doc(db, 'events', props.eventId, 'stampRally', stampRallyId),
            {
                id: stampRallyId,
                name: data.name,
                hint: data.hint,
                order: parseInt(data.order.toString()),
                imageURL: data.imageURL,
            }
        );

        const stampRallySecretId = nanoid();
        await setDoc(
            doc(
                db,
                'events',
                props.eventId,
                'stampRally',
                stampRallyId,
                'secret',
                'main'
            ),
            {
                id: 'main',
                secretId: stampRallySecretId,
            }
        );
    };

    const onFormSubmit = async (data: StampRallyForm) => {
        await addNewStampRally(data)
            .then(() => {
                toast.success('スタンプラリーの新規追加に成功');
                reset();
                onOpenChange();
            })
            .catch(() => {
                toast.error('スタンプラリーの新規追加に失敗');
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
                color='primary'
                variant='flat'
            >
                新規追加
            </Button>
            <EditorModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title='スタンプラリーを新規追加'
                onSubmit={handleSubmit(onFormSubmit)}
                isAdding
            >
                <Input
                    label='名前'
                    {...register('name')}
                    autoComplete='off'
                    isRequired
                    description='スタンプラリーの名前を入力してください'
                />
                <Input
                    label='画像URL'
                    {...register('imageURL')}
                    autoComplete='off'
                    isRequired
                    description='スタンプラリーの画像URLを入力してください'
                />
                <Input
                    label='ヒント'
                    {...register('hint')}
                    autoComplete='off'
                    description='スタンプラリーのヒントを入力してください'
                />
                <Input
                    autoComplete='off'
                    label='表示順番'
                    {...register('order')}
                    type='number'
                    isRequired
                    description='スタンプラリーの表示順番を入力してください'
                />
            </EditorModal>
        </>
    );
}
