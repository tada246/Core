import {
    Button,
    Image,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { IoArrowRedo, IoEye } from 'react-icons/io5';

type Props = {
    url: string;
    size?: 'sm' | 'md' | 'lg';
};

export default function PreviewImageModal(props: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                onPress={onOpen}
                size={props.size || 'sm'}
                isIconOnly
                variant='flat'
            >
                <IoEye />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                画像のプレビュー
                            </ModalHeader>
                            <ModalBody>
                                <Image
                                    src={props.url}
                                    alt='画像のプレビュー'
                                    width='100%'
                                    height='auto'
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onPress={onClose}
                                    endContent={<IoArrowRedo />}
                                    as={Link}
                                    isExternal={true}
                                    href={props.url}
                                >
                                    別のダブで開く
                                </Button>
                                <Button
                                    color='primary'
                                    onPress={onClose}
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
