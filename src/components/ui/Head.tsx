import { ReactElement } from 'react';

type Props = {
    icon?: ReactElement;
    title?: string | ReactElement;
    subtitle?: string;
};

export default function Head(props: Props) {
    return (
        <div>
            <div className='flex items-center gap-4'>
                {props.icon && (
                    <div className='drop-shadow-lg'>{props.icon}</div>
                )}
                {typeof props.title === 'string' ? (
                    <p className='text-3xl font-bold'>{props.title}</p>
                ) : (
                    props.title
                )}
            </div>
            <p className='text-sm mt-1 opacity-80'>{props.subtitle}</p>
        </div>
    );
}
