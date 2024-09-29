import { Image, ImageProps } from '@nextui-org/react';
import { useState } from 'react';

export default function ImageExpansion(props: ImageProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <button className='cursor-zoom-in' onClick={() => setIsOpen(true)}>
                <Image {...props} isZoomed={false} />
            </button>
            {isOpen && (
                <div
                    className='fixed top-0 left-0 w-full h-[100svh] bg-white/30 backdrop-blur cursor-zoom-out z-[10000] flex justify-center items-center'
                    onClick={() => setIsOpen(false)}
                >
                    <img src={props.src} alt={props.alt} />
                </div>
            )}
        </>
    );
}
