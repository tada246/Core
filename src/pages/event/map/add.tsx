import { Button, Input, useDisclosure } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { EditMapInfoForm } from './common';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { IoAddCircleOutline } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';
import OnlyEditors from '../../../components/ui/OnlyEditors';
import WarningCard from '../../../components/ui/WarningCard';

type Props = {
    eventId: string;
};

interface AddMapInfoProps extends EditMapInfoForm {
    id: string;
}

export default function AddMapInfo(props: Props) {
    const { isOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, reset } = useForm<AddMapInfoProps>();

    const createNewMap = async (data: AddMapInfoProps) => {
        await setDoc(doc(db, 'events', props.eventId, 'places', data.id), {
            id: data.id,
            name: data.name,
            location: {
                x: parseInt(data.location.x.toString()),
                y: parseInt(data.location.y.toString()),
            },
            imageURL: data.imageURL,
        });
    };

    const onSubmit = (data: AddMapInfoProps) => {
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
                <WarningCard
                    message='作成時の注意'
                    description='場所の追加を行うと削除ができません。'
                />
                <Input
                    autoComplete='off'
                    type='text'
                    label='ID'
                    {...register('id')}
                    isRequired
                    description='半角英数字で入力してください。'
                />
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
