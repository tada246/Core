import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import useSWR from 'swr';
import { db } from '../features/firebase';
import { Event } from '../types/firebase';

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

    return result;
}

export default function useEventList() {
    const { data, isLoading, error } = useSWR(
        '/api/events/list',
        getEventList,
        {
            revalidateOnFocus: false,
            errorRetryInterval: 10000,
        }
    );

    return {
        data,
        isLoading,
        error,
    };
}
