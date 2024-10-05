import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Event } from '../../types/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../features/firebase';
import EditInfo from './info';
import MapTopInfo from './top';
import MapInfo from './map';
import OthersInfo from './others';

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        if (id) {
            onSnapshot(doc(db, 'events', id), (doc) => {
                const currentEventData = doc.data() as Event;
                setEvent(currentEventData);
            });
        }
    }, [id]);

    if (!event || !id) {
        return <p>ロード中...</p>;
    }
    return (
        <div>
            <MapTopInfo event={event} />
            <EditInfo event={event} />
            <OthersInfo id={id} event={event} />
            <MapInfo id={id} mapImageURL={event.mapImageURL} />
        </div>
    );
}
