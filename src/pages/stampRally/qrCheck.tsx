import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import {
    IoBalloon,
    IoInformationCircleOutline,
    IoSadOutline,
    IoSparkles,
} from 'react-icons/io5';
import { useAllStampRallySecret } from '../../hooks/useStampRally';
import { useEffect, useState } from 'react';
import { useZxing } from 'react-zxing';
import { stars } from '../../features/confetti';

type Props = {
    eventId: string;
};

export default function QRCheck(props: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <button
                onClick={onOpen}
                className='shadow-medium p-4 rounded-medium flex items-center justify-center flex-col gap-2 hover:shadow-large duration-300'
            >
                <IoSparkles size={32} />
                <p className='text-sm font-bold'>QRコードでチェック</p>
            </button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                スタンプラリーQRコードでチェック
                            </ModalHeader>
                            <ModalBody>
                                <Content eventId={props.eventId} />
                            </ModalBody>
                            <ModalFooter className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <IoInformationCircleOutline size={14} />
                                    <p className='text-xs'>
                                        QRコードを読み取ると自動で始まります
                                    </p>
                                </div>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
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

function Content(props: Props) {
    const { data, error, isLoading } = useAllStampRallySecret(props.eventId);
    const [result, setResult] = useState('');
    const { ref } = useZxing({
        onDecodeResult(result) {
            setResult(result.getText());
        },
    });
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        const splitQR = result.split('-').sort();
        const answer = data?.map((d) => d.secretId).sort();
        const isCorrect = JSON.stringify(splitQR) === JSON.stringify(answer);

        if (isCorrect) {
            setPage(1);
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    stars();
                }, i * 200);
            }
        } else {
            setPage(2);
        }
    }, [result]);

    useEffect(() => {
        setPage(0);
    }, []);

    if (isLoading || !data)
        return <p className='text-center py-6'>ロード中...</p>;
    if (error) return <p className='text-center py-6'>エラー</p>;

    if (page === 0) {
        return <video ref={ref} className='w-full aspect-[4/3]' />;
    }

    if (page === 1) {
        return (
            <div className='flex flex-col gap-4 items-center justify-center py-12'>
                <IoBalloon size={64} />
                <p className='text-xl font-bold text-center'>
                    おめでとうございます！！
                </p>
            </div>
        );
    }

    if (page === 2) {
        return (
            <div className='flex flex-col gap-4 items-center justify-center py-12'>
                <IoSadOutline size={64} />
                <p className='text-xl font-bold text-center'>
                    もう一度試してください
                    <br />
                    新規作成を行った後はリロードしてください
                </p>
            </div>
        );
    }
}
