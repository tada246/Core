import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { FormEvent, ReactNode } from 'react';

type Props = {
    isOpen: boolean;
    title?: string;
    onOpenChange?: () => void;
    onSubmit?: (data: FormEvent<HTMLFormElement>) => void;
    children?: ReactNode;
};

export default function EditorModal(props: Props) {
    return (
        <Modal
            isOpen={props.isOpen}
            onOpenChange={props.onOpenChange}
            backdrop='blur'
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={props.onSubmit}>
                        <ModalHeader className='flex flex-col gap-1'>
                            {props.title}
                        </ModalHeader>
                        <ModalBody className='block'>
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
                                変更
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}
