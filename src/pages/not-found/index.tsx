import { Image } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export default function NotFound() {
    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
    };

    useEffect(() => {
        setInterval(() => {
            confetti({
                ...defaults,
                origin: {
                    x: randomInRange(0.1, 0.3),
                    y: Math.random() - 0.2,
                },
            });
            confetti({
                ...defaults,
                origin: {
                    x: randomInRange(0.7, 0.9),
                    y: Math.random() - 0.2,
                },
            });
        }, 300);
    }, []);
    return (
        <div>
            <div className='flex justify-center'>
                <Image
                    src='https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/documents%2FWeary%20Cat.png?alt=media&token=51f83115-2b5a-463f-ab0a-75aa3e3f7d74'
                    alt=''
                    width={300}
                    height={300}
                    data-size='auto'
                />
            </div>
            <h1 className='text-center text-5xl font-extrabold'>
                404 Not Found
            </h1>
            <p className='text-center mt-1'>残念でした。</p>
        </div>
    );
}
