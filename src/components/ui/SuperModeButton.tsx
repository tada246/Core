import { Button } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';

export default function SuperModeButton() {
    const [isRunning, setIsRunning] = useState<boolean>(false);

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
    const scalar = 10;
    const unicorn = confetti.shapeFromText({ text: '🌱', scalar });

    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        particleCount: 8,
        zIndex: 0,
        shapes: [unicorn],
    };

    useEffect(() => {
        if (!isRunning) return;
        setInterval(() => {
            confetti({
                ...defaults,
                origin: {
                    x: randomInRange(0.1, 0.3),
                    y: Math.random() - 0.2,
                },
                scalar: randomInRange(5, 10),
            });
            confetti({
                ...defaults,
                origin: {
                    x: randomInRange(0.7, 0.9),
                    y: Math.random() - 0.2,
                },
                scalar: randomInRange(5, 10),
            });
        }, 120);
    }, [isRunning]);
    return (
        <Button
            fullWidth
            size='sm'
            className='bg-transparent text-white/0'
            onClick={() => setIsRunning(true)}
        >
            SUPER MODE
        </Button>
    );
}
