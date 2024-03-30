import useSWR from 'swr';
import { db } from '../features/firebase';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { Image } from '../types/firebase';

async function getAllImages() {
    const q = query(
        collection(db, 'images'),
        limit(100),
        orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const result: Image[] = [];
    querySnapshot.forEach((doc: { data: Function }) => {
        result.push(doc.data());
    });

    return result;
}

export default function useAllImages() {
    const { data, error, isLoading } = useSWR(`/images`, getAllImages, {
        revalidateIfStale: false,
        focusThrottleInterval: 12000,
    });

    return {
        data,
        error,
        isLoading,
    };
}
