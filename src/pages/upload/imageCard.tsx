import { Button, Card, CardFooter } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { clipboardAtom } from '../../store/jotai';
import { copyText } from '../../features/copy';
import ImageExpansion from '../../components/ui/ImaegExpansion';

type Props = {
    item: {
        name: string;
        url: string;
    };
};

export default function UploadImageCard(props: Props) {
    const { item } = props;
    const [_, setClipboard] = useAtom(clipboardAtom);

    function copyURL(url: string) {
        copyText(url);
        setClipboard((prev) => [
            {
                text: url,
                timestamp: Date.now(),
            },
            ...prev,
        ]);
    }

    return (
        <Card isFooterBlurred radius='md' className='border-none w-60 h-60'>
            <ImageExpansion className='object-cover w-60 h-60' src={item.url} />
            <CardFooter className='flex justify-between absolute bg-black/20 backdrop-blur-md bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
                <p className='text-tiny w-32 truncate text-white'>
                    {item.name}
                </p>
                <Button
                    className='text-tiny text-white bg-black/40'
                    variant='flat'
                    color='default'
                    radius='lg'
                    size='sm'
                    onClick={() => copyURL(item.url)}
                >
                    Copy URL
                </Button>
            </CardFooter>
        </Card>
    );
}
