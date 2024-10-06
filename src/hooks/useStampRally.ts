import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';
import useSWR from 'swr';
import { StampRally, StampRallySecret } from '../types/firebase';
import { db } from '../features/firebase';
import { useEffect } from 'react';

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
                const _stampRally: StampRally[] = [];
                stampRallyDoc.forEach((doc) => {
                    const docData = doc.data() as StampRally;
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

async function fetchStampRallySecret(eventId: string, stampRallyId: string) {
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
        () => fetchStampRallySecret(eventId, stampRallyId),
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

async function fetchAllStampRally(eventId: string) {
    const collectionRef = collection(db, 'events', eventId, 'stampRally');
    const querySnapshot = await getDocs(collectionRef);
    const documentIds = querySnapshot.docs.map((doc) => doc.id);

    const promises = documentIds.map(async (stampRallyId) => {
        return await fetchStampRallySecret(eventId, stampRallyId);
    });

    const stampRallySecrets = await Promise.all(promises);
    const res_data = stampRallySecrets.filter((secret) => secret !== undefined);

    return res_data;
}

export function useAllStampRallySecret(eventId: string) {
    const { data, isLoading, error } = useSWR<StampRallySecret[]>(
        ['/api/events/', eventId, 'stampRally', 'secret'],
        () => fetchAllStampRally(eventId),
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
