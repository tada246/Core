import { Button, Input, useDisclosure } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { StampRallyForm } from './props';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { IoPencil } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';
import { StampRally } from '../../../types/firebase';

type Props = {
    eventId: string;
    preStampRally: StampRally;
};

export default function EditStampRally(props: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, setValue } = useForm<StampRallyForm>();
    const { preStampRally } = props;

    const addNewStampRally = async (data: StampRallyForm) => {
        await updateDoc(
            doc(db, 'events', props.eventId, 'stampRally', preStampRally.id),
            {
                name: data.name,
                hint: data.hint,
                order: parseInt(data.order.toString()),
                imageURL: data.imageURL,
            }
        );
    };

    const onFormSubmit = async (data: StampRallyForm) => {
        await addNewStampRally(data)
            .then(() => {
                toast.success('スタンプラリーの更新に成功');
                onOpenChange();
            })
            .catch(() => {
                toast.error('スタンプラリーの更新に失敗');
            });
    };

    const openModal = () => {
        setValue('name', preStampRally.name);
        setValue('hint', preStampRally.hint);
        setValue('order', preStampRally.order);
        setValue('imageURL', preStampRally.imageURL);
        onOpen();
    };

    return (
        <>
            <Button size='sm' isIconOnly onClick={openModal}>
                <IoPencil />
            </Button>
            <EditorModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title='スタンプラリーの更新'
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
