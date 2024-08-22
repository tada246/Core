import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { IoLogoMarkdown } from 'react-icons/io5';
import ReactMarkdown from 'react-markdown';

type Props = {
    content: string;
    size?: 'sm' | 'md' | 'lg';
    iconSize?: number;
};

export default function PreviewMarkDownModal(props: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                onPress={onOpen}
                isIconOnly
                variant='flat'
                size={props.size || 'sm'}
            >
                <IoLogoMarkdown size={props.size ?? 16} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                マークダウンのプレビュー
                            </ModalHeader>
                            <ModalBody>
                                <ReactMarkdown>{props.content}</ReactMarkdown>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onPress={onClose}
                                    color='primary'
                                    variant='shadow'
                                >
                                    閉じる
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
