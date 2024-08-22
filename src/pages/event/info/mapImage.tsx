import { Input, Link, useDisclosure } from '@nextui-org/react';
import {
    COMMON_INFO_NAME_CLASS,
    CommonEditInfoProps,
    CommonInformation,
} from './common';
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { IoMap } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';
import PreviewImageModal from '../../../components/ui/PrviewImageModal';

type EditMapImageForm = {
    mapImageURL: string;
};

export default function EditMapImage(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit } = useForm<EditMapImageForm>();

    const update = async (data: string) => {
        await updateDoc(doc(db, 'events', props.event.id), {
            mapImageURL: data,
        });
    };

    const onSubmit = (data: EditMapImageForm) => {
        update(data.mapImageURL)
            .then(() => {
                onOpenChange();
                toast.success('更新に成功');
            })
            .catch((_) => {
                toast.error('更新に失敗');
            });
    };

    return (
        <>
            <CommonInformation
                name='マップ画像'
                onOpen={onOpen}
                value={
                    <Link
                        href={event.mapImageURL}
                        className={COMMON_INFO_NAME_CLASS + ' break-all'}
                        underline='always'
                        isExternal
                    >
                        {event.mapImageURL}
                    </Link>
                }
                icon={<IoMap size={20} />}
                sideContent={
                    <PreviewImageModal url={event.mapImageURL} iconSize={18} />
                }
            />
            <EditorModal
                title='マップ画像の変更'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoComplete='off'
                    type='text'
                    label='新しいマップ画像リンク'
                    defaultValue={event.mapImageURL}
                    {...register('mapImageURL')}
                    description='リンクは、必ず「https://」から始まるURLを入力してください。'
                    isRequired
                />
            </EditorModal>
        </>
    );
}
