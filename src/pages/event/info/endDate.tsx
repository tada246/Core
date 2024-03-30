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
import { IoCalendarClearOutline } from 'react-icons/io5';
import dayjs from 'dayjs';
import EditorModal from '../../../components/ui/EditorModal';

type EditEndDateForm = {
    endDate: string;
};

export default function EditEndDate(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit } = useForm<EditEndDateForm>();

    const update = async (data: string) => {
        await updateDoc(doc(db, 'events', props.event.id), {
            date: {
                start: event.date.start,
                end: new Date(data),
            },
        });
    };

    const onSubmit = (data: EditEndDateForm) => {
        update(data.endDate)
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
                name='終了時刻'
                onOpen={onOpen}
                value={
                    <p className={COMMON_INFO_NAME_CLASS}>
                        {dayjs(
                            new Date(props.event.date.end.seconds * 1000)
                        ).format('YYYY/MM/DD HH:mm')}
                    </p>
                }
                icon={<IoCalendarClearOutline size={20} />}
            />
            <EditorModal
                title='終了時刻の変更'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoComplete='off'
                    type='datetime-local'
                    label='新しい終了時刻'
                    defaultValue={dayjs(
                        new Date(props.event.date.end.seconds * 1000)
                    ).format('YYYY-MM-DDTHH:mm')}
                    {...register('endDate')}
                />
            </EditorModal>
        </>
    );
}
