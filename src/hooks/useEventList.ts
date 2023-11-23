import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import useSWR from 'swr';
import { db } from '../features/firebase';
import { Event } from '../type/firebase';

async function getEventList() {
    const q = query(
        collection(db, 'events'),
        limit(20),
        orderBy('date.start', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const result: Event[] = [];
    querySnapshot.forEach((doc: { data: Function }) => {
        result.push(doc.data());
    });

    console.log(
        '%c イベント一覧の読み取り ',
        'color:white; background-color:rgb(34 211 238); padding:2px; border-radius:4px;'
    );

    return result;
}

export default function useEventList() {
    const { data, isLoading, error } = useSWR('/api/events/list', getEventList);

    return {
        data,
        isLoading,
        error,
    };
}
