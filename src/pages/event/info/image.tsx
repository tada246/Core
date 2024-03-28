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
import { IoImage } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';

type EditImageURLForm = {
    imageURL: string;
};

export default function EditImageURL(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit } = useForm<EditImageURLForm>();

    const update = async (data: string) => {
        await updateDoc(doc(db, 'events', props.event.id), {
            imageURL: data,
        });
    };

    const onSubmit = (data: EditImageURLForm) => {
        update(data.imageURL)
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
                name='見出し画像URL'
                onOpen={onOpen}
                value={
                    <Link
                        href={event.imageURL}
                        underline='always'
                        className={COMMON_INFO_NAME_CLASS + ' break-all'}
                        isExternal
                    >
                        {event.imageURL}
                    </Link>
                }
                icon={<IoImage size={20} />}
            />
            <EditorModal
                title='見出し画像URLの変更'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoComplete='off'
                    type='text'
                    label='新しいURL'
                    defaultValue={event.imageURL}
                    {...register('imageURL')}
                    description='リンクは、必ず「https://」から始まるURLを入力してください。'
                    isRequired
                />
            </EditorModal>
        </>
    );
}
