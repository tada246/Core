import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import useSWR from 'swr';
import { db } from '../features/firebase';
import { AdminUser } from '../types/firebase';

export default function useAdminUsers() {
    const { data, error, isLoading, mutate } = useSWR(
        `/admin/users`,
        getAdminUsers,
        {
            revalidateIfStale: false,
            focusThrottleInterval: 12000,
        }
    );

    return {
        data,
        error,
        isLoading,
        mutate,
    };
}

async function getAdminUsers() {
    const q = query(
        collection(db, 'admin_users'),
        orderBy('authority', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const result: AdminUser[] = [];
    querySnapshot.forEach((doc: { data: Function }) => {
        result.push(doc.data() as AdminUser);
    });

    return result;
}
