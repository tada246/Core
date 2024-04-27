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

type Props = {
    image: ImageType;
};

export default function ImageCard(props: Props) {
    const { image } = props;

    return (
        <Card shadow='sm' radius='lg'>
            <CardBody className='overflow-visible p-0'>
                <Image
                    shadow='sm'
                    radius='lg'
                    width={250}
                    height={250}
                    alt={image.id}
                    className='w-full object-cover aspect-square'
                    src={image.url}
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
                        onPress={() => copyText(image.url)}
                    >
                        <IoCopyOutline size={16} />
                    </Button>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}
