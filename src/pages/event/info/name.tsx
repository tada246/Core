import { Input, useDisclosure } from '@nextui-org/react';
import {
    COMMON_INFO_NAME_CLASS,
    CommonEditInfoProps,
    CommonInformation,
} from './common';
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { IoMedicalSharp } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';

type EditNameForm = {
    name: string;
};

export default function EditName(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, setValue } = useForm<EditNameForm>();

    const update = async (data: string) => {
        await updateDoc(doc(db, 'events', props.event.id), {
            name: data,
        });
    };

    const onSubmit = (data: EditNameForm) => {
        update(data.name)
            .then(() => {
                onOpenChange();
                toast.success('更新に成功');
            })
            .catch((_) => {
                toast.error('更新に失敗');
            });
    };

    const openModal = () => {
        setValue('name', event.name);
        onOpenChange();
    };

    return (
        <>
            <CommonInformation
                name='名前'
                onOpen={openModal}
                value={<p className={COMMON_INFO_NAME_CLASS}>{event.name}</p>}
                icon={<IoMedicalSharp size={20} />}
            />
            <EditorModal
                title='名前の変更'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoComplete='off'
                    type='text'
                    label='新しい名前'
                    defaultValue={event.name}
                    {...register('name')}
                    isRequired
                />
            </EditorModal>
        </>
    );
}
