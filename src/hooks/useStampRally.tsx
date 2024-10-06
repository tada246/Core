import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';
import useSWR from 'swr';
import { StampRally, StampRallySecret } from '../types/firebase';
import { db } from '../features/firebase';
import { useEffect } from 'react';

export interface StampRallyData extends StampRally {
    secret?: StampRallySecret;
}

export default function useStampRally(eventId?: string) {
    if (!eventId)
        return {
            error: 'eventId is not provided',
        };

    const { data, isLoading, error, mutate } = useSWR<StampRally[]>(
        ['/api/events/', eventId, 'stampRally'],
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            errorRetryInterval: 100000,
            focusThrottleInterval: 100000,
        }
    );

    useEffect(() => {
        if (!eventId || data) return;

        onSnapshot(
            query(
                collection(db, 'events', eventId, 'stampRally'),
                orderBy('order', 'asc')
            ),
            (stampRallyDoc) => {
                const _stampRally: StampRallyData[] = [];
                stampRallyDoc.forEach((doc) => {
                    const docData = doc.data() as StampRallyData;
                    _stampRally.push(docData);
                });
                mutate(_stampRally);
            }
        );
    }, []);

    return {
        data,
        isLoading,
        error,
    };
}

async function fetchStampRally(eventId: string, stampRallyId: string) {
    const docRef = doc(
        db,
        'events',
        eventId,
        'stampRally',
        stampRallyId,
        'secret',
        'main'
    );
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return;
    }

    return docSnap.data() as StampRallySecret;
}

export function useStampRallySecret(eventId: string, stampRallyId: string) {
    const { data, isLoading, error } = useSWR<StampRallySecret | undefined>(
        ['/api/events/', eventId, 'stampRally', stampRallyId, 'secret'],
        () => fetchStampRally(eventId, stampRallyId),
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
