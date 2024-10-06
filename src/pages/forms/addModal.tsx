import { Button, Input, Textarea, useDisclosure } from '@nextui-org/react';
import { FormEditProps, FormEditState } from '.';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../features/firebase';
import toast from 'react-hot-toast';
import { IoAddCircleOutline } from 'react-icons/io5';
import EditorModal from '../../components/ui/EditorModal';

export function AddNewForm(props: FormEditProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, reset } = useForm<FormEditState>();

    const addNewForm = async (data: FormEditState) => {
        const id = uuidv4();
        await setDoc(doc(db, 'events', props.id, 'forms', id), {
            id: id,
            name: data.name,
            url: data.url,
            content: data.content,
            order: parseInt(data.order.toString()),
        });
    };

    const onFormSubmit = async (data: FormEditState) => {
        await addNewForm(data)
            .then(() => {
                toast.success('アンケートの新規追加に成功');
                reset();
                onOpenChange();
            })
            .catch(() => {
                toast.error('アンケートの新規追加に失敗');
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
            >
                アンケートの新規追加
            </Button>
            <EditorModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title='アンケートを新規追加'
                onSubmit={handleSubmit(onFormSubmit)}
                isAdding
            >
                <Input
                    label='名前'
                    {...register('name')}
                    autoComplete='off'
                    isRequired
                    description='アンケートの名前を入力してください'
                />
                <Input
                    label='URL'
                    {...register('url')}
                    autoComplete='off'
                    isRequired
                    description='アンケートのURLを入力してください（https://から始まるもの）'
                />
                <Textarea
                    label='内容'
                    autoComplete='off'
                    {...register('content')}
                    isRequired
                    description='アンケートの内容を入力してください'
                />
                <Input
                    autoComplete='off'
                    label='表示順番'
                    {...register('order')}
                    type='number'
                    isRequired
                    description='アンケートの表示順番を入力してください'
                />
            </EditorModal>
        </>
    );
}
