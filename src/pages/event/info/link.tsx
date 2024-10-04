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
import { IoLink } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';

type EditLinkForm = {
    link: string;
};

export default function EditLink(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, setValue } = useForm<EditLinkForm>();

    const update = async (data: string) => {
        await updateDoc(doc(db, 'events', props.event.id), {
            link: data,
        });
    };

    const onSubmit = (data: EditLinkForm) => {
        update(data.link)
            .then(() => {
                onOpenChange();
                toast.success('更新に成功');
            })
            .catch((_) => {
                toast.error('更新に失敗');
            });
    };

    function openModal() {
        setValue('link', event.link);
        onOpenChange();
    }

    return (
        <>
            <CommonInformation
                name='リンク'
                onOpen={openModal}
                value={
                    <Link
                        href={event.link}
                        className={COMMON_INFO_NAME_CLASS + ' break-all'}
                        underline='always'
                        isExternal
                    >
                        {event.link}
                    </Link>
                }
                icon={<IoLink size={20} />}
            />
            <EditorModal
                title='リンクの変更'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoComplete='off'
                    type='text'
                    label='新しいリンク'
                    defaultValue={event.link}
                    {...register('link')}
                    description='リンクは、必ず「https://」から始まるURLを入力してください。'
                    isRequired
                />
            </EditorModal>
        </>
    );
}
