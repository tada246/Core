import {
    Button,
    Input,
    Select,
    SelectItem,
    Tab,
    Tabs,
    Textarea,
    useDisclosure,
} from '@nextui-org/react';
import { IoAddCircleOutline, IoLogoMarkdown } from 'react-icons/io5';
import { message_type, writer } from '../../store/notice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../features/firebase';
import { v4 as uuidv4 } from 'uuid';
import EditorModal from '../../components/ui/EditorModal';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Markdown from '../../components/atom/Markdown';

type MessageForm = {
    title: string;
    type: string;
    writer: string[];
    content: string;
};

export default function MessageAddModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, reset, watch } = useForm<MessageForm>();
    const [error, setError] = useState<string | null>(null);
    const currentContentData = watch('content');

    async function createNewNotice(data: MessageForm) {
        const id = uuidv4();
        await setDoc(doc(db, 'notices', id), {
            id: id,
            timestamp: serverTimestamp(),
            title: data.title,
            type: data.type,
            writer: data.writer.toString().split(','),
            content: data.content,
        });
    }

    const onSubmit: SubmitHandler<MessageForm> = (data) => {
        createNewNotice(data)
            .then(() => {
                onOpenChange();
                toast.success('追加に成功');
            })
            .catch((_) => {
                toast.error('追加に失敗');
            });
    };

    return (
        <>
            <div className='flex justify-center'>
                <Button
                    onPress={() => {
                        onOpen();
                        reset();
                        setError(null);
                    }}
                    variant='flat'
                    startContent={<IoAddCircleOutline size={18} />}
                    fullWidth
                >
                    新規投稿
                </Button>
            </div>
            <EditorModal
                title='お知らせの投稿'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSubmit(onSubmit)}
                isAdding
                footerSide={
                    <div className='flex gap-2'>
                        <Button
                            isIconOnly
                            radius='full'
                            variant='light'
                            as={Link}
                            to='/markdown'
                        >
                            <IoLogoMarkdown />
                        </Button>
                    </div>
                }
            >
                <Input
                    defaultValue=''
                    type='text'
                    label='タイトル'
                    isRequired
                    id='title'
                    {...register('title')}
                />
                <Select
                    label='タイプ'
                    isRequired
                    defaultSelectedKeys={['normal']}
                    id='type'
                    {...register('type')}
                >
                    {message_type.map((v) => (
                        <SelectItem
                            key={v.id}
                            value={v.id}
                            textValue={v.name}
                            aria-label={v.name}
                        >
                            <div className='flex gap-2 items-center'>
                                <div>{v.icon}</div>
                                <p className='flex-1'>{v.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label='投稿者'
                    isRequired
                    id='writer'
                    defaultSelectedKeys={[]}
                    selectionMode='multiple'
                    description='複数選択可'
                    {...register('writer')}
                >
                    {writer.map((v) => (
                        <SelectItem
                            key={v}
                            value={v}
                            textValue={v}
                            aria-label={v}
                        >
                            {v}
                        </SelectItem>
                    ))}
                </Select>
                <div>
                    <Tabs
                        aria-label='Options'
                        classNames={{
                            panel: 'pt-2',
                        }}
                    >
                        <Tab key='edit' title='編集'>
                            <Textarea
                                label='内容'
                                isRequired
                                defaultValue=''
                                id='content'
                                placeholder='お知らせの内容を入力'
                                classNames={{
                                    input: 'resize-y min-h-[2rem] max-h-[30rem]',
                                }}
                                {...register('content')}
                            />
                        </Tab>
                        <Tab key='preview' title='プレビュー'>
                            <div className=''>
                                {!currentContentData ? (
                                    <p className='mt-5 text-default-600 text-center text-sm'>
                                        プレビューがありません
                                    </p>
                                ) : (
                                    <Markdown content={currentContentData} />
                                )}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                {error && (
                    <p className='text-red-500 text-tiny opacity-80'>{error}</p>
                )}
            </EditorModal>
        </>
    );
}
