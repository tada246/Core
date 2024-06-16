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
                                    変更
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
