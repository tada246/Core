import { useEffect, useState } from 'react';
import { Place } from '../../../types/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { Button, Image, Tooltip } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import EditMapInfo from './edit';
import AddMapInfo from './add';

type Props = {
    id: string;
    mapImageURL: string;
};

export default function MapInfo(props: Props) {
    const [places, setPlaces] = useState<Place[]>();

    useEffect(() => {
        try {
            onSnapshot(
                query(collection(db, 'events', props.id, 'places')),
                (doc) => {
                    const _places: Place[] = [];
                    doc.forEach((item) => {
                        _places.push(item.data() as Place);
                    });
                    setPlaces(_places);
                }
            );
        } catch (_) {
            toast.error('データの取得に失敗');
        }
    }, []);

    if (!places) {
        return;
    }

    return (
        <div className='bg-content1 shadow-small p-6 rounded-large mt-10 overflow-hidden'>
            <div className='p-4 bg-white rounded-large border-1 border-default-200'>
                <div className='w-full overflow-hidden relative'>
                    <img src={props.mapImageURL} alt='' className='w-full' />
                    <div className='w-full h-full absolute top-0 left-0'>
                        {places.map((place) => (
                            <Tooltip content={place.name} key={place.id}>
                                <button
                                    className='w-2 h-2 absolute bg-primary rounded-full -translate-x-1/2 -translate-y-1/2'
                                    style={{
                                        left: `${place.location.x}%`,
                                        top: `${place.location.y}%`,
                                    }}
                                />
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-4 flex gap-4 flex-col'>
                {places.map((place) => (
                    <div
                        key={place.id}
                        className='w-full p-4 bg-white rounded-md flex items-center gap-4'
                    >
                        <Image
                            src={place.imageURL}
                            alt='画像'
                            width={160}
                            height={90}
                            className='w-16 h-9 rounded-md object-cover bg-center'
                            isBlurred
                        />
                        <div className='flex-1'>
                            <p className='font-bold'>{place.name}</p>
                            <p className='text-tiny'>
                                X: {place.location.x}% Y: {place.location.y}%
                            </p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <EditMapInfo
                                eventId={props.id}
                                id={place.id}
                                location={{
                                    x: place.location.x,
                                    y: place.location.y,
                                }}
                                imageURL={place.imageURL}
                                name={place.name}
                            />
                            <Button
                                as={Link}
                                to={`/map/${props.id}/place/${place.id}`}
                                isIconOnly
                                size='sm'
                            >
                                <IoChevronForward />
                            </Button>
                        </div>
                    </div>
                ))}
                <AddMapInfo eventId={props.id} />
            </div>
        </div>
    );
}
