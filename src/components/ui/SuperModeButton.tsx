import { Button } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';

export default function SuperModeButton() {
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        if (!isRunning) return;
        setInterval(() => {
            // 背景の色から全て取得
            const colors = [
                '#F5A343',
                '#00A6FF',
                '#FFD1D1',
                '#FF66B3',
                '#F8AC53',
                '#755AFF',
                '#FF66B3',
            ];

            confetti({
                particleCount: 7,
                angle: 60,
                scalar: 1.5,
                spread: 140,
                origin: { x: 0 },
                colors: colors,
            });
            confetti({
                particleCount: 7,
                angle: 120,
                scalar: 1.5,
                spread: 140,
                origin: { x: 1 },
                colors: colors,
            });
        }, 120);
    }, [isRunning]);

    return (
        <>
            {isRunning && (
                <div
                    className='fixed -z-50 top-0 left-0 w-full h-[100svh] opacity-80'
                    style={{
                        backgroundColor: `hsla(0,100%,50%,1)`,
                        backgroundImage: `radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)`,
                    }}
                ></div>
            )}
            <Button
                fullWidth
                size='sm'
                className='bg-transparent text-white/0'
                onClick={() => setIsRunning((prev) => !prev)}
            >
                SUPER MODE
            </Button>
        </>
    );
}
