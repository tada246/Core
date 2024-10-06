import { Form } from '../../types/firebase';
import { Button, Input, Textarea, useDisclosure } from '@nextui-org/react';
import { FormEditState } from '.';
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../features/firebase';
import toast from 'react-hot-toast';
import { IoPencilSharp } from 'react-icons/io5';
import EditorModal from '../../components/ui/EditorModal';
import { useEffect } from 'react';

type UpdateFormEditProps = {
    id: string;
    form: Form;
};

export default function UpdateForm(props: UpdateFormEditProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, setValue } = useForm<FormEditState>();

    const updateForm = async (data: FormEditState) => {
        await updateDoc(doc(db, 'events', props.id, 'forms', props.form.id), {
            name: data.name,
            url: data.url,
            content: data.content,
            order: parseInt(data.order.toString()),
        });
    };

    const updateFormValue = () => {
        setValue('name', props.form.name);
        setValue('url', props.form.url);
        setValue('content', props.form.content);
        setValue('order', props.form.order);
    };

    useEffect(() => {
        updateFormValue();
    }, [props.form]);

    const onFormSubmit = async (data: FormEditState) => {
        await updateForm(data)
            .then(() => {
                toast.success('既存アンケートの更新に成功');
                onOpenChange();
            })
            .catch(() => {
                toast.error('既存アンケートの更新に失敗');
            });
    };

    const openModal = () => {
        updateFormValue();
        onOpen();
    };

    return (
        <>
            <Button onPress={openModal} isIconOnly size='sm' variant='flat'>
                <IoPencilSharp size={16} />
            </Button>
            <EditorModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title='アンケートを更新'
                onSubmit={handleSubmit(onFormSubmit)}
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
