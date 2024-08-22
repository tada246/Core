import { Textarea, useDisclosure } from '@nextui-org/react';
import {
    COMMON_INFO_NAME_CLASS,
    CommonEditInfoProps,
    CommonInformation,
} from './common';
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { IoInformation } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';
import PreviewMarkDownModal from '../../../components/ui/PreviewMarkDownModal';

type EditOverviewForm = {
    overview: string;
};

export default function EditOverview(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit } = useForm<EditOverviewForm>();

    const update = async (data: string) => {
        await updateDoc(doc(db, 'events', props.event.id), {
            overview: data,
        });
    };

    const onSubmit = (data: EditOverviewForm) => {
        update(data.overview)
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
                name='見出し'
                onOpen={onOpen}
                value={
                    <p className={COMMON_INFO_NAME_CLASS}>{event.overview}</p>
                }
                icon={<IoInformation size={20} />}
                sideContent={<PreviewMarkDownModal content={event.overview} />}
            />
            <EditorModal
                title='見出しの変更'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Textarea
                    label='新しい見出し'
                    defaultValue={event.overview}
                    height='12rem'
                    {...register('overview')}
                    isRequired
                />
            </EditorModal>
        </>
    );
}
