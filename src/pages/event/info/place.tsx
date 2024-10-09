import { Button, Input, Link, useDisclosure } from '@nextui-org/react';
import {
    COMMON_INFO_NAME_CLASS,
    CommonEditInfoProps,
    CommonInformation,
} from './common';
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { IoEye, IoLocationOutline } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';
import { EventPlace } from '../../../types/firebase';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';

type EditEventPlace = EventPlace;

export default function EditEventPlace(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, setValue } = useForm<EditEventPlace>();
    const [position, setPosition] = useState<[number, number]>([0, 0]);

    const update = async (data: EditEventPlace) => {
        await updateDoc(doc(db, 'events', props.event.id), {
            place: {
                name: data.name,
                lat: data.lat,
                lng: data.lng,
            },
        });
    };

    const onSubmit = (data: EditEventPlace) => {
        update(data)
            .then(() => {
                onOpenChange();
                toast.success('更新に成功');
            })
            .catch((_) => {
                toast.error('更新に失敗');
            });
    };

    const openModal = () => {
        if (!event.place) {
            return;
        }

        setValue('name', event.place.name);
        setValue('lat', event.place.lat);
        setValue('lng', event.place.lng);
        setPosition([event.place.lat, event.place.lng]);
        onOpenChange();
    };

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                setValue('lat', e.latlng.lat);
                setValue('lng', e.latlng.lng);
            },
        });

        return <Marker position={position} />;
    }

    if (!event.place) {
        return;
    }

    return (
        <>
            <CommonInformation
                name='イベントの場所'
                onOpen={openModal}
                value={
                    <p className={COMMON_INFO_NAME_CLASS}>
                        {event.place.name}
                        <span className='pl-2 text-sm'>
                            ({event.place.lat}, {event.place.lng})
                        </span>
                    </p>
                }
                icon={<IoLocationOutline size={20} />}
                sideContent={
                    <Button
                        isIconOnly
                        size='sm'
                        variant='flat'
                        as={Link}
                        isExternal
                        href={`https://google.com/maps?q=${event.place.lat},${event.place.lng}`}
                    >
                        <IoEye size={16} />
                    </Button>
                }
            />
            <EditorModal
                title='イベントの場所の変更'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoComplete='off'
                    type='text'
                    label='名前'
                    defaultValue={event.place.name}
                    {...register('name')}
                    description='例: 桐光学園など'
                    isRequired
                />
                <div className='w-full aspect-square flex flex-col rounded-large overflow-hidden'>
                    <MapContainer
                        center={position}
                        zoom={16}
                        className='w-full flex-1'
                    >
                        <TileLayer
                            attribution='© <a href="http://osm.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        <LocationMarker />
                    </MapContainer>
                    <div className='h-6 bg-default-100 flex justify-center gap-4 items-center'>
                        <p className='text-xs text-default-600'>
                            緯度
                            <span className='text-sm text-black pl-1'>
                                {position[0]}
                            </span>
                        </p>
                        <p className='text-xs text-default-600'>
                            経度
                            <span className='text-sm text-black pl-1'>
                                {position[1]}
                            </span>
                        </p>
                    </div>
                </div>
            </EditorModal>
        </>
    );
}
