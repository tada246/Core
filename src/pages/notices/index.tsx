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
