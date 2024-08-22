import { Button } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { IoCopy } from 'react-icons/io5';
import { clipboardAtom } from '../../store/jotai';
import { copyText } from '../../features/copy';

export default function TextHighlight() {
    const [selectedText, setSelectedText] = useState<string>('');
    const [position, setPosition] = useState<{ left: number; top: number }>({
        left: 0,
        top: 0,
    });
    const [_, setClipboard] = useAtom(clipboardAtom);

    function copyContent() {
        copyText(selectedText);
        setClipboard((prev) => [
            {
                text: selectedText,
                timestamp: Date.now(),
            },
            ...prev.map((item) => ({ ...item, copied: false })),
        ]);
    }

    useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection();
            const text = selection?.toString().trim();
            if (text) {
                const range = selection?.getRangeAt(0);
                const rect = range?.getBoundingClientRect();
                setSelectedText(text);
                setPosition({
                    left: rect?.left || 0,
                    top: rect?.bottom ? rect?.bottom + window.scrollY : 0,
                });
            } else {
                setSelectedText('');
            }
        };

        document.addEventListener('mouseup', handleSelection);
        return () => {
            document.removeEventListener('mouseup', handleSelection);
        };
    }, []);

    if (!selectedText) {
        return;
    }

    return (
        <div
            style={{
                position: 'absolute',
                left: `${position.left}px`,
                top: `${position.top}px`,
                zIndex: 10,
            }}
        >
            <div className='flex gap-1 p-2 bg-white/40 backdrop-blur-md rounded-medium shadow-medium'>
                <Button
                    isIconOnly
                    variant='flat'
                    size='sm'
                    onClick={copyContent}
                >
                    <IoCopy />
                </Button>
            </div>
        </div>
    );
}
