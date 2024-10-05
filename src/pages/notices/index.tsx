import { IoFileTrayOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';
import { db } from '../../features/firebase';
import { Notice } from '../../types/firebase';
import Head from '../../components/ui/Head';
import OnlyEditors from '../../components/ui/OnlyEditors';
import MessageAddModal from './form';
import NoticeCard from './card';
import dayjs from 'dayjs';
import { Chip } from '@nextui-org/react';

export default function Message() {
    const [data, setData] = useState<Notice[]>([]);

    const groupedNotices = data.reduce(
        (acc: Record<string, Notice[]>, notice) => {
            const date = dayjs(notice.timestamp.seconds * 1000).format(
                'YYYY-MM-DD'
            );
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(notice);
            return acc;
        },
        {}
    );

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
                <div className='mt-12 flex flex-col gap-12'>
                    {Object.keys(groupedNotices).map((date) => (
                        <div key={date}>
                            <div className='flex gap-2 items-end'>
                                <h2 className='text-xl font-bold'>
                                    {dayjs(date).format('YYYY/MM/DD (dddd)')}
                                </h2>
                                <Chip size='sm'>
                                    {groupedNotices[date].length} 件
                                </Chip>
                            </div>
                            <div className='gap-x-8 lg:columns-2 columns-1 mt-4'>
                                {groupedNotices[date].map((v) => (
                                    <NoticeCard {...v} key={v.id} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
