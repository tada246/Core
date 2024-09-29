import { IoCloudOfflineOutline, IoCloudUploadOutline } from 'react-icons/io5';
import { Button, Card, CardFooter, Progress } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { clipboardAtom } from '../../store/jotai';
import { copyText } from '../../features/copy';
import ImageExpansion from '../../components/ui/ImaegExpansion';
import { UploadedImages } from '.';

type Props = {
    isAllow: Boolean;
    dropAreaBackground: string;
    uploadedImages: UploadedImages[];
    getRootProps: Function;
    getInputProps: Function;
};

export default function Upload(props: Props) {
    return (
        <div>
            <div
                {...props.getRootProps()}
                className={`mt-4 py-8 rounded-xl ${props.dropAreaBackground} duration-200`}
            >
                <input {...props.getInputProps()} />
                {!props.isAllow && (
                    <IoCloudOfflineOutline
                        size={52}
                        className='mx-auto stroke-danger-300 fill-danger-300'
                    />
                )}
                {props.isAllow && (
                    <IoCloudUploadOutline
                        size={52}
                        className='mx-auto stroke-primary-300 fill-primary-300'
                    />
                )}
                <div className='text-center mt-3'>
                    <p className='font-semibold opacity-80'>画像をドロップ</p>
                    <p className='text-sm'>or</p>
                    <p className='font-semibold opacity-80'>画像を選択</p>
                </div>
            </div>
            {props.uploadedImages.length !== 0 && (
                <div className='mt-5'>
                    <UploadingImagesState items={props.uploadedImages} />
                    <UploadedImagesState items={props.uploadedImages} />
                </div>
            )}
        </div>
    );
}

type UploadingImagesStateProps = {
    items: UploadedImages[];
};

function UploadingImagesState(props: UploadingImagesStateProps) {
    return (
        <ul className='list-none flex flex-col gap-4'>
            {props.items.map(
                (item) =>
                    !item.isUploaded && (
                        <li key={item.id}>
                            <Progress
                                aria-label='アップロード中...'
                                size='sm'
                                value={item.state}
                                color='success'
                                className='w-full'
                                classNames={{
                                    base: 'w-full',
                                    track: 'drop-shadow-xl border border-default',
                                    indicator: !item.isError
                                        ? 'bg-gradient-to-br from-sky-400 to-indigo-400'
                                        : 'bg-gradient-to-br from-rose-500 to-pink-400',
                                    label: `tracking-wider font-medium text-sm ${
                                        item.isError
                                            ? 'text-rose-500'
                                            : 'text-default-600'
                                    }`,
                                    value: 'text-foreground/40 text-sm',
                                }}
                                label={`${item.name} ${
                                    item.isError ? '- エラー' : ''
                                }`}
                                showValueLabel
                            />
                        </li>
                    )
            )}
        </ul>
    );
}

type UploadedImagesStateProps = {
    items: UploadedImages[];
};

function UploadedImagesState(props: UploadedImagesStateProps) {
    return (
        <div className='gap-4 grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 justify-items-center mt-5'>
            {props.items.map(
                (item) =>
                    item.isUploaded && (
                        <UploadImageCard
                            item={{
                                name: item.name,
                                url: item.url,
                            }}
                        />
                    )
            )}
        </div>
    );
}

type UploadImageProps = {
    item: {
        name: string;
        url: string;
    };
};

function UploadImageCard(props: UploadImageProps) {
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
