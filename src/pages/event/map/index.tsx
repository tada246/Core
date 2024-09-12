import { useEffect, useState } from 'react';
import { Place } from '../../../types/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { Button, Image, Tab, Tabs, Tooltip } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { IoChevronForward, IoEye, IoPencil, IoTrash } from 'react-icons/io5';
import EditMapInfo from './edit';
import AddMapInfo from './add';
import EditorMap from './editorMap';
import PreviewMap from './previewMap';

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
            <Tabs aria-label='マップ'>
                <Tab
                    key='editor'
                    title={
                        <div className='flex items-center gap-1'>
                            <IoPencil />
                            <p>エディター</p>
                        </div>
                    }
                >
                    <EditorMap
                        mapImageURL={props.mapImageURL}
                        places={places}
                    />
                </Tab>
                <Tab
                    key='preview'
                    title={
                        <div className='flex items-center gap-1'>
                            <IoEye />
                            <p>プレビュー</p>
                        </div>
                    }
                >
                    <PreviewMap imageURL={props.mapImageURL} places={places} />
                </Tab>
            </Tabs>
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
                            className='w-16 h-9 object-cover aspect-square'
                            style={{
                                width: '4rem',
                                height: '2.25rem',
                            }}
                            isBlurred
                            isZoomed
                            radius='md'
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
                            <Tooltip content='再帰的に削除する必要があるので実装にもう少し時間がかかります'>
                                <Button
                                    isIconOnly
                                    size='sm'
                                    className='opacity-50'
                                >
                                    <IoTrash />
                                </Button>
                            </Tooltip>
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
