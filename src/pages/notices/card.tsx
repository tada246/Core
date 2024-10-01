import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
} from '@nextui-org/react';
import { IoTrash } from 'react-icons/io5';
import { message_type } from '../../store/notice';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../features/firebase';
import { Notice } from '../../types/firebase';
import dayjs from 'dayjs';
import OnlyEditors from '../../components/ui/OnlyEditors';
import toast from 'react-hot-toast';
import FinalCheckModal from '../../components/ui/FinalCheckModal';
import Markdown from '../../components/atom/Markdown';

export default function NoticeCard(props: Notice) {
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
