import { doc, getDoc } from 'firebase/firestore';
import { Event } from '../types/firebase';
import { db } from '../features/firebase';
import useSWR from 'swr';

async function fetchStampRallySecret(eventId: string) {
    const docRef = doc(db, 'events', eventId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return;
    }

    return docSnap.data() as Event;
}

export function useEvent(eventId?: string) {
    if (!eventId) {
        return {
            data: undefined,
            isLoading: false,
            error: undefined,
        };
    }

    const { data, isLoading, error } = useSWR<Event | undefined>(
        ['/api/events/', eventId],
        () => fetchStampRallySecret(eventId),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            errorRetryInterval: 100000,
            focusThrottleInterval: 100000,
        }
    );

    return {
        data,
        isLoading,
        error,
    };
}
