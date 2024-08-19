import { Button, Input, useDisclosure } from '@nextui-org/react';
import { Floor } from '../../../types/firebase';
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import EditorModal from '../../../components/ui/EditorModal';
import { IoPencil } from 'react-icons/io5';
import toast from 'react-hot-toast';

type FloorForm = {
    name: string;
    order: number;
    mapImageURL: string;
};

type FloorProps = {
    event_id: string;
    place_id: string;
    data: Floor;
};

export default function FloorEditor(props: FloorProps) {
    const { isOpen, onOpenChange } = useDisclosure();
    const { data: floor_data } = props;
    const { register, handleSubmit, reset, setValue } = useForm<FloorForm>();

    const updateFloor = async (data: FloorForm) => {
        await updateDoc(
            doc(
                db,
                'events',
                props.event_id,
                'places',
                props.place_id,
                'floor',
                floor_data.id
            ),
            {
                name: data.name,
                order: parseInt(data.order.toString()),
                mapImageURL: data.mapImageURL,
            }
        );
    };

    const onSubmit = (data: FloorForm) => {
        updateFloor(data)
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
        setValue('order', floor_data.order);
        setValue('name', floor_data.name);
        setValue('mapImageURL', floor_data.mapImageURL || '');
    };

    return (
        <>
            <Button fullWidth onClick={onOpenChangeModal} isIconOnly size='sm'>
                <IoPencil />
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
                    label='名前'
                    {...register('name')}
                    description='階層の名前。例: 1階, 2階, 3階。'
                />
                <Input
                    autoComplete='off'
                    type='text'
                    label='画像URL'
                    {...register('mapImageURL')}
                    description='リンクは、必ず「https://」から始まるURLを入力してください。'
                    isRequired
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
