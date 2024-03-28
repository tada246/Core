import { ReactElement } from 'react';

type Props = {
    icon: ReactElement;
    title: string;
    subtitle: string;
};

export default function Head(props: Props) {
    return (
        <div>
            <div className='flex items-center gap-4'>
                {props.icon}
                <p className='text-3xl font-bold'>{props.title}</p>
            </div>
            <p className='text-sm mt-1 opacity-80'>{props.subtitle}</p>
        </div>
    );
}
