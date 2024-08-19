import { useAtom } from 'jotai';
import { clipboardAtom } from '../../store/jotai';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoCopy } from 'react-icons/io5';
import dayjs from 'dayjs';
import { Button } from '@nextui-org/react';
import { copyText } from '../../features/copy';
import useWindowSize from '../../hooks/useWindowSize';

export default function DynamicBar() {
    const [clipboard, setClipboard] = useAtom(clipboardAtom);
    const [width] = useWindowSize();

    function deleteItem(index: number) {
        setClipboard((prev) => prev.filter((_, i) => i !== index));
    }

    if (width < 1300) return;

    return (
        <div className='fixed flex bottom-4 right-[calc((100%-15rem)/2)] translate-x-1/2 w-[30rem] z-50 flex-col gap-2'>
            <AnimatePresence>
                {clipboard.map((item, index) => (
                    <motion.div
                        key={item.timestamp}
                        className='flex gap-4 items-center bg-white/40 backdrop-blur-lg shadow-large rounded-large p-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className='flex-1'>
                            <div className='w-full text-sm line-clamp-3 text-default-800'>
                                {item.text}
                            </div>
                            <div className='w-full text-tiny text-default-600'>
                                {dayjs(item.timestamp).format('MM/DD HH:mm:ss')}
                            </div>
                        </div>
                        <div className='flex gap-2 flex-col'>
                            <Button
                                isIconOnly
                                variant='flat'
                                radius='full'
                                size='sm'
                                onPress={() => copyText(item.text)}
                            >
                                <IoCopy size={14} />
                            </Button>
                            <Button
                                isIconOnly
                                variant='flat'
                                radius='full'
                                size='sm'
                                onPress={() => deleteItem(index)}
                            >
                                <IoClose size={14} />
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
