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
import GeographyInput from '../../../components/ui/geographyInput';

type EditEventPlace = EventPlace;

export default function EditEventPlace(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, setValue } = useForm<EditEventPlace>();

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
        onOpenChange();
    };

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
                <GeographyInput
                    lat={event.place.lat}
                    lng={event.place.lng}
                    onChange={(lat, lng) => {
                        setValue('lat', lat);
                        setValue('lng', lng);
                    }}
                />
            </EditorModal>
        </>
    );
}
