import { Button } from '@nextui-org/react';
import { IoChevronForwardOutline, IoReceipt } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type FormInfoProps = {
    id: string;
};
export default function FormInfo(props: FormInfoProps) {
    return (
        <div className='mt-8 flex flex-col gap-4 bg-content1 shadow-small px-6 py-4 rounded-large'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <div>
                        <IoReceipt size={20} />
                    </div>
                    <div>
                        <p className='text-sm text-black/60'>
                            アンケートの編集
                        </p>
                        アンケートの編集、追加、削除
                    </div>
                </div>
                <Button
                    isIconOnly
                    size='sm'
                    variant='flat'
                    as={Link}
                    to={`/map/${props.id}/form`}
                >
                    <IoChevronForwardOutline size={18} />
                </Button>
            </div>
        </div>
    );
}
