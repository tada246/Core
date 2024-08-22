import { useParams } from 'react-router-dom';
import { Form } from '../../types/firebase';
import { useEffect, useState } from 'react';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../../features/firebase';
import toast from 'react-hot-toast';
import {
    Button,
    Input,
    Link as NextUILink,
    Textarea,
    useDisclosure,
} from '@nextui-org/react';
import { IoAddCircleOutline, IoPencilSharp, IoTrash } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import EditorModal from '../../components/ui/EditorModal';
import OnlyEditors from '../../components/ui/OnlyEditors';
import Head from '../../components/ui/Head';
import FinalCheckModal from '../../components/ui/FinalCheckModal';

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const [forms, setForms] = useState<Form[]>([]);

    async function getForm() {
        if (id) {
            onSnapshot(
                query(
                    collection(db, 'events', id, 'forms'),
                    orderBy('order', 'asc')
                ),
                (doc) => {
                    const _forms: Form[] = [];
                    doc.forEach((item) => {
                        _forms.push(item.data() as Form);
                    });
                    setForms(_forms);
                }
            );
        }
    }

    useEffect(() => {
        getForm().catch(() => {
            toast.error('フォームの取得に失敗');
        });
    }, []);

    if (!id) return <div>イベントが選択されていません</div>;

    return (
        <div>
            <Head
                title={'アンケートの編集'}
                subtitle={`${id} のアンケートを編集します。`}
            />
            <div className='flex flex-col gap-8 mt-6'>
                {forms.map((form) => (
                    <div
                        key={form.id}
                        className='flex justify-between items-start p-6 gap-6 bg-white shadow-medium rounded-large'
                    >
                        <div className='flex flex-col gap-3'>
                            <div className='w-8 h-8 flex items-center justify-center bg-primary-400 text-white rounded-small'>
                                <p className='text-sm'>{form.order}</p>
                            </div>
                            <OnlyEditors>
                                <UpdateForm form={form} id={id} />
                            </OnlyEditors>
                            <OnlyEditors>
                                <DeleteForm eventId={id} formId={form.id} />
                            </OnlyEditors>
                        </div>
                        <div className='flex-1 w-full'>
                            <p className='text-xl font-bold'>{form.name}</p>
                            <NextUILink
                                isExternal
                                className='mt-0 w-full line-clamp-1 break-all'
                                size='sm'
                                href={form.url}
                            >
                                {form.url}
                            </NextUILink>
                            <div className='mt-3 bg-white rounded-lg w-full'>
                                {form.content.split('\n').map((line) => (
                                    <p
                                        key={line}
                                        className='text-sm w-full break-all'
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <OnlyEditors>
                    <AddNewForm id={id} />
                </OnlyEditors>
            </div>
        </div>
    );
}

// フォームの新規追加もーだるとかなんとか

type FormEditProps = {
    id: string;
};

type FormEditState = {
    name: string;
    url: string;
    content: string;
    order: number;
};

function AddNewForm(props: FormEditProps) {
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

// フォームの更新もーだるとかなんとか

type UpdateFormEditProps = {
    id: string;
    form: Form;
};

function UpdateForm(props: UpdateFormEditProps) {
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

type DeleteFormProps = {
    eventId: string;
    formId: string;
};

function DeleteForm(props: DeleteFormProps) {
    async function deleteForm() {
        await deleteDoc(doc(db, 'events', props.eventId, 'forms', props.formId))
            .then(() => {
                toast.success('削除に成功');
            })
            .catch(() => {
                toast.error('削除に失敗');
            });
    }

    return (
        <FinalCheckModal
            onPress={() => deleteForm()}
            isIconOnly
            size='sm'
            variant='flat'
            message='このアンケートを削除しますか？'
        >
            <IoTrash size={16} />
        </FinalCheckModal>
    );
}
