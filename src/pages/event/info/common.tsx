import { Button } from '@nextui-org/react';
import { IoPencilSharp } from 'react-icons/io5';
import { Event } from '../../../types/firebase';
import OnlyEditors from '../../../components/ui/OnlyEditors';

export const COMMON_INFO_NAME_CLASS = 'text-md font-semibold line-clamp-3';

export type CommonEditInfoProps = {
    event: Event;
};

type CommonEditInfoModalProps = {
    name: string;
    onOpen: () => void;
    value: React.ReactNode;
    icon: React.ReactNode;
    onOpen2?: () => void;
    onOpenIcon2?: React.ReactNode;
};

export function CommonInformation(props: CommonEditInfoModalProps) {
    return (
        <div className='flex justify-between items-center gap-4'>
            <div className='flex items-center gap-4'>
                <div>{props.icon}</div>
                <div>
                    <p className='text-sm text-black/60'>{props.name}</p>
                    {props.value}
                </div>
            </div>
            <OnlyEditors>
                <div className='flex gap-2'>
                    <Button
                        isIconOnly
                        size='sm'
                        variant='flat'
                        onClick={props.onOpen}
                    >
                        <IoPencilSharp size={18} />
                    </Button>
                    {props.onOpen2 && (
                        <Button
                            isIconOnly
                            size='sm'
                            variant='flat'
                            onClick={props.onOpen2}
                        >
                            {props.onOpenIcon2}
                        </Button>
                    )}
                </div>
            </OnlyEditors>
        </div>
    );
}
