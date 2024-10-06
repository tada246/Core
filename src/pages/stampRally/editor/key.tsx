import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { IoKey } from 'react-icons/io5';
import { StampRally } from '../../../types/firebase';
import { useStampRallySecret } from '../../../hooks/useStampRally';

type Props = {
    eventId: string;
    stampRally: StampRally;
};

export default function StampRallyKeyModal(props: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data, error, isLoading } = useStampRallySecret(
        props.eventId,
        props.stampRally.id
    );
    const { stampRally } = props;

    return (
        <>
            <Button size='sm' isIconOnly onPress={onOpen}>
                <IoKey />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                {stampRally.name}のQRコードのキー
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    {isLoading && '読み込み中...'}
                                    {error && error}
                                    {data && data.secretId}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' onPress={onClose}>
                                    確認
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
