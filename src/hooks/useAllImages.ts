import useSWR from 'swr';
import { storage } from '../features/firebase';
import { list, ref } from 'firebase/storage';

async function getAllImages() {
    const listRef = ref(storage, '/api/uploads/');
    const items = await list(listRef, { maxResults: 200 });

    return items;
}

export default function useAllImages() {
    const { data, error, isLoading } = useSWR(
        '/images/list',
        getAllImages
    );

    return {
        data,
        error,
        isLoading,
    };
}
