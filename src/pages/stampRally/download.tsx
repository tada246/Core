import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';
import { useStampRallySecret } from '../../hooks/useStampRally';
import { StampRally } from '../../types/firebase';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';
import { IoDownloadOutline } from 'react-icons/io5';

type Props = {
    eventId: string;
    stampRally: StampRally[];
};

export default function StampRallyQRDownload(props: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className='shadow-medium p-4 rounded-medium md:col-span-2'>
                <div className='flex items-center justify-between gap-6'>
                    <div>
                        <p>スタンプラリーのQRコードの画像を一括作成</p>
                        <p className='text-xs text-default-600'>
                            今回新規作成した場合は、リロードしてください。
                        </p>
                    </div>
                    <Button size='sm' color='primary' onPress={onOpen}>
                        表示
                    </Button>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                QRコード一覧
                            </ModalHeader>
                            <ModalBody>
                                <div className='grid grid-cols-2 gap-4'>
                                    {props.stampRally.map((rally) => (
                                        <QRCodeCard
                                            key={rally.id}
                                            eventId={props.eventId}
                                            stampRally={rally}
                                        />
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter>
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

type QRCodeCardProps = {
    eventId: string;
    stampRally: StampRally;
};

function QRCodeCard(props: QRCodeCardProps) {
    const { data, error, isLoading } = useStampRallySecret(
        props.eventId,
        props.stampRally.id
    );
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const downloadImage = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const image = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');

        const link = document.createElement('a');
        link.download = `${props.stampRally.name}-qrcode.png`;
        link.href = image;
        link.click();
    };

    if (isLoading || !data || error) return;

    return (
        <div className='shadow-medium rounded-medium p-6 pb-4'>
            <div>
                <div className='w-full aspect-square'>
                    <QRCodeCanvas
                        value={data.secretId}
                        ref={canvasRef}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>
                <div className='flex justify-between items-center gap-2 mt-4'>
                    <p className='text-sm flex-1 line-clamp-1'>
                        {props.stampRally.name}
                    </p>
                    <Button
                        size='sm'
                        isIconOnly
                        variant='flat'
                        onPress={downloadImage}
                        color='secondary'
                    >
                        <IoDownloadOutline size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
