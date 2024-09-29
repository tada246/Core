import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression, { Options } from 'browser-image-compression';
import { IoDocumentsOutline, IoDownloadOutline, IoLeaf } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { Button, Card, CardBody, CardFooter, Tooltip } from '@nextui-org/react';
import ImageExpansion from '../../components/ui/ImaegExpansion';

type CompressorImage = {
    name: string;
    url: string;
    size: number;
};

const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `圧縮-${name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default function ImageCompressor() {
    const [compressedImage, setCompressedImage] = useState<CompressorImage[]>(
        []
    );

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) {
            return;
        }

        for (const file of acceptedFiles) {
            const options: Options = {
                maxSizeMB: 0.08,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };

            try {
                const compressedFile = await imageCompression(file, options);
                setCompressedImage((prev) => [
                    ...prev,
                    {
                        name: compressedFile.name,
                        url: URL.createObjectURL(compressedFile),
                        size: compressedFile.size / 1024,
                    },
                ]);
            } catch (error) {
                toast.error('画像の圧縮に失敗しました');
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const dropAreaBackground = isDragActive
        ? 'bg-secondary-100 shadow-inset'
        : 'bg-secondary-50';

    const dropAreaRounded =
        compressedImage.length > 0 ? 'rounded-t-xl' : 'rounded-xl';

    function handleDownloadAll() {
        compressedImage.forEach((item) => {
            handleDownload(item.url, item.name);
        });
    }

    return (
        <div>
            <div
                {...getRootProps()}
                className={`mt-4 py-8 ${dropAreaBackground} duration-200 ${dropAreaRounded}`}
            >
                <input {...getInputProps()} />
                <IoLeaf
                    size={52}
                    className='mx-auto stroke-secondary-300 fill-secondary-300'
                />
                <div className='text-center mt-3'>
                    <p className='font-semibold opacity-80'>画像をドロップ</p>
                    <p className='text-sm'>or</p>
                    <p className='font-semibold opacity-80'>画像を選択</p>
                </div>
            </div>
            {compressedImage.length > 0 && (
                <Button
                    fullWidth
                    variant='flat'
                    color='secondary'
                    className='shadow-none rounded-t-none'
                    startContent={<IoDocumentsOutline />}
                    onClick={handleDownloadAll}
                >
                    一括ダウンロード
                </Button>
            )}
            {compressedImage.length > 0 && (
                <div className='gap-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mt-10'>
                    {compressedImage.map((item, index) => (
                        <ImageCard key={index} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

function ImageCard(props: { item: CompressorImage }) {
    return (
        <Card shadow='sm' radius='lg'>
            <CardBody className='overflow-visible p-0 w-full'>
                <ImageExpansion
                    shadow='sm'
                    radius='lg'
                    width={300}
                    height={300}
                    className='w-full object-cover aspect-square'
                    isBlurred
                    src={props.item.url}
                    classNames={{
                        img: 'w-full',
                        wrapper: 'w-full',
                        blurredImg: 'w-full',
                    }}
                />
            </CardBody>
            <CardFooter className='flex justify-between py-1'>
                <p className='text-tiny opacity-90'>{props.item.name}</p>
                <div className='flex gap-2'>
                    <Tooltip content='圧縮後のサイズ'>
                        <Button
                            isIconOnly
                            variant='light'
                            className='text-tiny'
                            disabled
                        >
                            {props.item.size.toFixed(0)}KB
                        </Button>
                    </Tooltip>
                    <Tooltip content='ダウンロードする'>
                        <Button
                            isIconOnly
                            variant='light'
                            onClick={() =>
                                handleDownload(props.item.url, props.item.name)
                            }
                        >
                            <IoDownloadOutline size={16} />
                        </Button>
                    </Tooltip>
                </div>
            </CardFooter>
        </Card>
    );
}
