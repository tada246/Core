import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Input,
    Select,
    SelectItem,
    Tab,
    Tabs,
    Textarea,
    useDisclosure,
} from '@nextui-org/react';
import {
    IoAddCircleOutline,
    IoFileTrayOutline,
    IoLogoMarkdown,
    IoTrash,
} from 'react-icons/io5';
import { message_type, writer } from '../../store/notice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
    collection,
    deleteDoc,
    doc,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';
import { db } from '../../features/firebase';
import { v4 as uuidv4 } from 'uuid';
import { Notice } from '../../types/firebase';
import dayjs from 'dayjs';
import Head from '../../components/ui/Head';
import OnlyEditors from '../../components/ui/OnlyEditors';
import EditorModal from '../../components/ui/EditorModal';
import toast from 'react-hot-toast';
import FinalCheckModal from '../../components/ui/FinalCheckModal';
import { Link } from 'react-router-dom';
import Markdown from '../../components/atom/Markdown';

export default function Message() {
    const [data, setData] = useState<Notice[]>([]);

    useEffect(() => {
        onSnapshot(
            query(
                collection(db, 'notices'),
                limit(20),
                orderBy('timestamp', 'desc')
            ),
            (querySnapshot) => {
                const message_data: Notice[] = [];
                querySnapshot.forEach((doc) => {
                    message_data.push(doc.data() as Notice);
                });
                setData(message_data);
            }
        );
    }, []);

    return (
        <div>
            <Head
                icon={<IoFileTrayOutline size={24} />}
                title='リアルタイム連絡'
                subtitle='TANE Mapへのお知らせの投稿を行うことができます'
            />
            <div className='mt-10'>
                <div>
                    <OnlyEditors>
                        <MessageAddModal />
                    </OnlyEditors>
                </div>
                {data.length === 0 && (
                    <p className='text-center text-sm opacity-80 mt-6'>
                        お知らせはありません 🥹
                    </p>
                )}
                <div className='mt-6'>
                    <div className='gap-x-8 lg:columns-2 columns-1'>
                        {data.map((v) => (
                            <NoticeCard {...v} key={v.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function NoticeCard(props: Notice) {
    const type = message_type.find((v) => v.id === props.type);

    async function deleteNotice() {
        await deleteDoc(doc(db, 'notices', props.id))
            .then(() => {
                toast.success('削除に成功');
            })
            .catch(() => {
                toast.error('削除に失敗');
            });
    }

    return (
        <Card className='w-full p-2 mb-8 max-w-lg mx-auto' shadow='sm'>
            <CardHeader className='flex flex-col gap-2 justify-start items-start'>
                <div className='flex gap-3 items-center'>
                    <div
                        className={`w-10 h-10 flex justify-center items-center bg-${type?.color}/20 text-${type?.color} rounded-small`}
                    >
                        <div>{type?.largeIcon}</div>
                    </div>
                    <div className='flex flex-col gap-0 justify-center'>
                        <p className='font-bold'>{props.title}</p>
                        <p className='text-tiny text-default-500'>
                            {dayjs(
                                props?.timestamp?.seconds
                                    ? props.timestamp.seconds * 1000
                                    : 0
                            ).format('YYYY/MM/DD HH:mm:ss')}
                        </p>
                    </div>
                </div>
                <div className='flex gap-1 w-full overflow-x-auto'>
                    {props.writer.map((v, i) => (
                        <Chip
                            key={i}
                            size='sm'
                            variant='flat'
                            className='text-tiny'
                        >
                            {v}
                        </Chip>
                    ))}
                </div>
            </CardHeader>
            <CardBody className='px-3 py-0'>
                <Markdown content={props.content} />
            </CardBody>
            <CardFooter>
                <OnlyEditors>
                    <div className='flex gap-2'>
                        <FinalCheckModal
                            message='本当にお知らせを削除しますか？'
                            size='sm'
                            variant='flat'
                            startContent={<IoTrash />}
                            onPress={() => {
                                deleteNotice();
                            }}
                        >
                            削除
                        </FinalCheckModal>
                    </div>
                </OnlyEditors>
            </CardFooter>
        </Card>
    );
}

type MessageForm = {
    title: string;
    type: string;
    writer: string[];
    content: string;
};

function MessageAddModal() {
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
