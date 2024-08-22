import { Button, Input, useDisclosure } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { EditMapInfoForm } from './common';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { IoAddCircleOutline } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';
import OnlyEditors from '../../../components/ui/OnlyEditors';

type Props = {
    eventId: string;
};

export default function AddMapInfo(props: Props) {
    const { isOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, reset } = useForm<EditMapInfoForm>();

    const createNewMap = async (data: EditMapInfoForm) => {
        const newId = uuidv4();
        await setDoc(doc(db, 'events', props.eventId, 'places', newId), {
            id: newId,
            name: data.name,
            location: {
                x: parseInt(data.location.x.toString()),
                y: parseInt(data.location.y.toString()),
            },
            imageURL: data.imageURL,
        });
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
            <OnlyEditors>
                <Button
                    fullWidth
                    onClick={onOpenChangeModal}
                    startContent={<IoAddCircleOutline />}
                >
                    新しい場所を追加
                </Button>
            </OnlyEditors>
            <EditorModal
                title='場所の追加'
                isOpen={isOpen}
                onOpenChange={onOpenChangeModal}
                onSubmit={handleSubmit(onSubmit)}
                isAdding
            >
                <Input
                    autoComplete='off'
                    type='text'
                    label='名前'
                    {...register('name')}
                    isRequired
                />
                <div className='flex gap-2'>
                    <Input
                        autoComplete='off'
                        type='number'
                        label='X座標'
                        {...register('location.x')}
                        description='0〜100の間で入力してください。単位は%です。'
                        isRequired
                    />
                    <Input
                        autoComplete='off'
                        type='number'
                        label='Y座標'
                        {...register('location.y')}
                        description='0〜100の間で入力してください。単位は%です。'
                        isRequired
                    />
                </div>
                <Input
                    autoComplete='off'
                    type='text'
                    label='画像URL'
                    {...register('imageURL')}
                    description='リンクは、必ず「https://」から始まるURLを入力してください。'
                    isRequired
                />
            </EditorModal>
        </>
    );
}
