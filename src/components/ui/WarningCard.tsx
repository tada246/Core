import { ReactNode } from 'react';
import { IoWarning } from 'react-icons/io5';

type Props = {
    message?: string;
    description?: string | ReactNode;
    className?: string;
};

export default function WarningCard(props: Props) {
    const { message, description } = props;

    return (
        <div
            className={
                'w-full p-6 flex items-center gap-6 bg-warning-100 rounded-medium mb-5' +
                props.className
            }
        >
            <IoWarning size={24} />
            <div className='flex-1'>
                <p className='text-xl font-bold text-default-600'>{message}</p>
                {typeof description === 'string' ? (
                    <p className='text-sm'>{description}</p>
                ) : (
                    description
                )}
            </div>
        </div>
    );
}
