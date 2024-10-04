import { Switch, cn, useDisclosure } from '@nextui-org/react';
import {
    COMMON_INFO_NAME_CLASS,
    CommonEditInfoProps,
    CommonInformation,
} from './common';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../features/firebase';
import { IoBalloonOutline } from 'react-icons/io5';
import EditorModal from '../../../components/ui/EditorModal';

type EditIsStampRallyEnabledForm = {};

export default function EditIsStampRallyEnabled(props: CommonEditInfoProps) {
    const { event } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { handleSubmit } = useForm<EditIsStampRallyEnabledForm>();
    const [isSelected, setIsSelected] = useState<boolean>(
        props.event.isStampRallyEnabled
    );

    const update = async (data: boolean) => {
        await updateDoc(doc(db, 'events', props.event.id), {
            isStampRallyEnabled: data,
        });
    };

    const onSubmit = (_: EditIsStampRallyEnabledForm) => {
        update(isSelected)
            .then(() => {
                onOpenChange();
                toast.success('更新に成功');
            })
            .catch((_) => {
                toast.error('更新に失敗');
            });
    };

    function openModal() {
        setIsSelected(event.isStampRallyEnabled);
        onOpen();
    }

    return (
        <>
            <CommonInformation
                name='スタンプラリー機能'
                onOpen={openModal}
                value={
                    <p className={COMMON_INFO_NAME_CLASS}>
                        {event.isStampRallyEnabled ? '可能' : '不可'}
                    </p>
                }
                icon={<IoBalloonOutline size={20} />}
            />
            <EditorModal
                title='スタンプラリー設定の変更'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Switch
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                    classNames={{
                        base: cn(
                            'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
                            'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                            'data-[selected=true]:border-primary'
                        ),
                        wrapper: 'p-0 h-4 overflow-visible',
                        thumb: cn(
                            'w-6 h-6 border-2 shadow-lg',
                            'group-data-[hover=true]:border-primary',
                            'group-data-[selected=true]:ml-6',
                            'group-data-[pressed=true]:w-7',
                            'group-data-[selected]:group-data-[pressed]:ml-4'
                        ),
                    }}
                >
                    <div className='flex flex-col gap-1'>
                        <p className='text-medium'>
                            スタンプラリー機能をオンにする
                        </p>
                        <p className='text-tiny text-default-400'>
                            スタンプラリー機能は、スタンプラリーの編集から設定できます。
                        </p>
                    </div>
                </Switch>
            </EditorModal>
        </>
    );
}
