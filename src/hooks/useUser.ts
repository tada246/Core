import { doc, getDoc } from 'firebase/firestore';
import { db } from '../features/firebase';
import useSWRImmutable from 'swr';
import { User } from '../types/firestore';
import { userConverter } from '../converters/users';

export async function fetchUserData(uid?: string) {
    if (!uid) {
        return;
    }

    const docRef = doc(db, 'users', uid).withConverter(userConverter);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return;
    }

    return docSnap.data();
}

export default function useUser(userId?: string) {
    const { data, isLoading, error, mutate } = useSWRImmutable<
        User | undefined
    >(['/api/users/', userId], () => fetchUserData(userId));

    return {
        user: data,
        userFetchLoading: isLoading,
        userFetchError: error,
        userNotFound: !data && !isLoading && !error && userId,
        mutateUser: mutate,
    };
}
