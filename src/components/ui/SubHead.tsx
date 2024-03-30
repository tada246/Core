import { ReactElement, memo } from 'react';

type Props = {
    title: string;
    subtitle: string;
    children?: ReactElement;
    className?: string;
};

const SubHead = memo((props: Props) => {
    return (
        <div className={props.className}>
            <div>
                <p className='text-xl font-bold'>{props.title}</p>
                <p className='text-sm opacity-80'>{props.subtitle}</p>
            </div>
            {props.children}
        </div>
    );
});

export default SubHead;
