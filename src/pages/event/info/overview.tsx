import { Button, Tab, Tabs, Textarea, useDisclosure } from '@nextui-org/react';
import {
    COMMON_INFO_NAME_CLASS,
    CommonEditInfoProps,
    CommonInformation,
} from './common';
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import toast from 'react-hot-toast';
import { IoInformation, IoLogoMarkdown, IoReload } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';
import PreviewMarkDownModal from '../../../components/ui/PreviewMarkDownModal';
import Markdown from '../../../components/atom/Markdown';
import { Link } from 'react-router-dom';

type EditOverviewForm = {
    overview: string;
};

export default function EditOverview(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, watch, setValue } =
        useForm<EditOverviewForm>();
    const currentData = watch('overview');

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

    function resetData() {
        setValue('overview', event.overview);
    }

    function openModal() {
        setValue('overview', event.overview);
        onOpen();
    }

    return (
        <>
            <CommonInformation
                name='見出し'
                onOpen={openModal}
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
                footerSide={
                    <div className='flex gap-2'>
                        <Button
                            isIconOnly
                            radius='full'
                            variant='light'
                            onClick={resetData}
                        >
                            <IoReload />
                        </Button>
                        <Button
                            isIconOnly
                            radius='full'
                            variant='light'
                            as={Link}
                            to='/markdown'
                        >
                            <IoLogoMarkdown />
                        </Button>
                    </div>
                }
            >
                <Tabs aria-label='Options'>
                    <Tab key='edit' title='編集'>
                        <Textarea
                            label='新しい見出し'
                            defaultValue={event.overview}
                            height='12rem'
                            isRequired
                            classNames={{
                                input: 'resize-y min-h-[2rem] max-h-[30rem]',
                            }}
                            {...register('overview')}
                        />
                    </Tab>
                    <Tab key='preview' title='プレビュー'>
                        {!currentData ? (
                            <Markdown content={event.overview} />
                        ) : (
                            <Markdown content={currentData} />
                        )}
                    </Tab>
                </Tabs>
            </EditorModal>
        </>
    );
}
