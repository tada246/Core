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
import dayjs from 'dayjs';
import { IoCalendarClearOutline } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';

type EditStartDateForm = {
    startDate: string;
};

export default function EditStartDate(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit } = useForm<EditStartDateForm>();

    const update = async (data: string) => {
        await updateDoc(doc(db, 'events', props.event.id), {
            date: {
                start: new Date(data),
                end: event.date.end,
            },
        });
    };

    const onSubmit = (data: EditStartDateForm) => {
        update(data.startDate)
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
                name='開始時刻'
                onOpen={onOpen}
                value={
                    <p className={COMMON_INFO_NAME_CLASS}>
                        {dayjs(
                            new Date(props.event.date.start.seconds * 1000)
                        ).format('YYYY/MM/DD HH:mm')}
                    </p>
                }
                icon={<IoCalendarClearOutline size={20} />}
            />
            <EditorModal
                title='開始時刻の変更'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoComplete='off'
                    type='datetime-local'
                    label='開始時刻'
                    defaultValue={dayjs(
                        new Date(props.event.date.start.seconds * 1000)
                    ).format('YYYY-MM-DDTHH:mm')}
                    {...register('startDate')}
                    isRequired
                />
            </EditorModal>
        </>
    );
}
