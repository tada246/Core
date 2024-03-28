import { Button, Input, useDisclosure } from '@nextui-org/react';
import { doc, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { IoPencilSharp } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';
import { EditMapInfoForm } from './common';
import OnlyEditors from '../../../components/ui/OnlyEditors';

type EditMapInfoProps = {
    id: string;
    eventId: string;
    name: string;
    location: { x: number; y: number };
    imageURL: string;
};

export default function EditMapInfo(props: EditMapInfoProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit } = useForm<EditMapInfoForm>();

    const update = async (data: EditMapInfoForm) => {
        await updateDoc(doc(db, 'events', props.eventId, 'places', props.id), {
            name: data.name,
            location: {
                x: parseInt(data.location.x.toString()),
                y: parseInt(data.location.y.toString()),
            },
            imageURL: data.imageURL,
        });
    };

    const onSubmit = (data: EditMapInfoForm) => {
        update(data)
            .then(() => {
                onOpenChange();
                toast.success('更新に成功');
            })
            .catch((_) => {
                toast.error('更新に失敗');
            });
    };

    return (
        <>
            <OnlyEditors>
                <Button isIconOnly onClick={onOpen} size='sm'>
                    <IoPencilSharp size={16} />
                </Button>
            </OnlyEditors>
            <EditorModal
                title='マップの変更'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoComplete='off'
                    type='text'
                    label='名前'
                    defaultValue={props.name}
                    isRequired
                    {...register('name')}
                />
                <div className='flex gap-2'>
                    <Input
                        autoComplete='off'
                        type='number'
                        label='X座標'
                        defaultValue={props.location.x.toString()}
                        {...register('location.x')}
                        description='0〜100の間で入力してください。単位は%です。'
                        isRequired
                    />
                    <Input
                        autoComplete='off'
                        type='number'
                        label='Y座標'
                        defaultValue={props.location.y.toString()}
                        {...register('location.y')}
                        description='0〜100の間で入力してください。単位は%です。'
                        isRequired
                    />
                </div>
                <Input
                    autoComplete='off'
                    type='text'
                    label='画像URL'
                    defaultValue={props.imageURL}
                    {...register('imageURL')}
                    description='リンクは、必ず「https://」から始まるURLを入力してください。'
                    isRequired
                />
            </EditorModal>
        </>
    );
}
