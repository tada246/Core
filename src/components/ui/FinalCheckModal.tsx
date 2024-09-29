import {
    Button,
    useDisclosure,
    ButtonProps,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/react';
import { ReactNode } from 'react';

interface Props extends ButtonProps {
    children: ReactNode;
    message: string;
}

export default function FinalCheckModal(props: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button {...props} onPress={onOpen} onClick={onOpen} />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                最後の確認
                            </ModalHeader>
                            <ModalBody>
                                <p>{props.message}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={onClose} variant='light'>
                                    閉じる
                                </Button>
                                <Button
                                    onPress={props.onPress}
                                    onClick={props.onClick}
                                    color='danger'
                                    variant='shadow'
                                >
                                    削除
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
