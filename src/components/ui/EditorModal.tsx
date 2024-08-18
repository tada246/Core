import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { useAtom } from 'jotai';
import { FormEvent, ReactNode } from 'react';
import { clipboardAtom } from '../../store/jotai';
import { IoClose, IoCopy } from 'react-icons/io5';
import { copyText } from '../../features/copy';
import dayjs from 'dayjs';
import useWindowSize from '../../hooks/useWindowSize';

type Props = {
    isOpen: boolean;
    title?: string;
    onOpenChange?: () => void;
    onSubmit?: (data: FormEvent<HTMLFormElement>) => void;
    children?: ReactNode;
    isAdding?: boolean;
};

export default function EditorModal(props: Props) {
    const [clipboard, setClipboard] = useAtom(clipboardAtom);
    const [width] = useWindowSize();

    function deleteItem(index: number) {
        setClipboard((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onOpenChange={props.onOpenChange}
            backdrop='blur'
            scrollBehavior='inside'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>
                            {props.title}
                        </ModalHeader>
                        <form
                            onSubmit={props.onSubmit}
                            className='overflow-auto'
                        >
                            <ModalBody>
                                <div className='flex gap-3 h-full flex-col'>
                                    {props.children}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
                                    キャンセル
                                </Button>
                                <Button
                                    color='primary'
                                    variant='shadow'
                                    type='submit'
                                >
                                    {props.isAdding ? '追加' : '変更'}
                                </Button>
                            </ModalFooter>
                        </form>
                        {clipboard.length > 0 && width >= 1300 && (
                            <div className='flex fixed right-0 z-50 top-1/2 -translate-y-1/2 px-6 py-2 w-96 bg-white flex-col gap-2 divide-y-1 rounded-l-large shadow-medium divide-default-400 max-h-[70%] overflow-auto'>
                                <Button
                                    fullWidth
                                    color='danger'
                                    variant='shadow'
                                    onClick={() => setClipboard([])}
                                    className='my-2'
                                >
                                    全て削除
                                </Button>
                                {clipboard.map((item, index) => (
                                    <div
                                        key={item.timestamp}
                                        className='flex gap-0 items-center py-4'
                                    >
                                        <div className='w-[calc(100%-32px)] pr-4'>
                                            <div className='text-sm line-clamp-3 text-default-600'>
                                                {item.text}
                                            </div>
                                            <div className='text-tiny text-default-600'>
                                                {dayjs(item.timestamp).format(
                                                    'YYYY/MM/DD HH:mm:ss'
                                                )}
                                            </div>
                                        </div>
                                        <div className='w-8 flex gap-2 flex-col'>
                                            <Button
                                                isIconOnly
                                                variant='flat'
                                                radius='full'
                                                size='sm'
                                                onPress={() =>
                                                    copyText(item.text)
                                                }
                                            >
                                                <IoCopy size={14} />
                                            </Button>
                                            <Button
                                                isIconOnly
                                                variant='flat'
                                                radius='full'
                                                size='sm'
                                                onPress={() =>
                                                    deleteItem(index)
                                                }
                                            >
                                                <IoClose size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
