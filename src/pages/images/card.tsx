import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Image,
    Tooltip,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { copyText } from '../../features/copy';
import { IoCopyOutline } from 'react-icons/io5';
import { Image as ImageType } from '../../types/firebase';
import { clipboardAtom } from '../../store/jotai';
import { useAtom } from 'jotai';

type Props = {
    image: ImageType;
};

export default function ImageCard(props: Props) {
    const { image } = props;
    const [_, setClipboard] = useAtom(clipboardAtom);

    function copyURL(url: string) {
        copyText(url);
        setClipboard((prev) => [
            {
                text: url,
                timestamp: Date.now(),
            },
            ...prev.map((item) => ({ ...item, copied: false })),
        ]);
    }
    return (
        <Card shadow='sm' radius='lg'>
            <CardBody className='overflow-visible p-0 w-full'>
                <Image
                    shadow='sm'
                    radius='lg'
                    width={300}
                    height={300}
                    alt={image.id}
                    className='w-full object-cover aspect-square'
                    isBlurred
                    src={image.url}
                    classNames={{
                        img: 'w-full',
                        wrapper: 'w-full',
                        blurredImg: 'w-full',
                    }}
                />
            </CardBody>
            <CardFooter className='flex justify-between py-1'>
                <p className='text-tiny opacity-90'>
                    {dayjs(image.timestamp.seconds * 1000).format('YYYY/MM/DD')}
                </p>
                <Tooltip content='URLをコピーする'>
                    <Button
                        isIconOnly
                        variant='light'
                        onPress={() => copyURL(image.url)}
                    >
                        <IoCopyOutline size={16} />
                    </Button>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}
