import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline, IoDuplicate } from 'react-icons/io5';
import { storage } from '../features/firebase';
import { v4 as uuid } from 'uuid';
import { Button, Card, CardFooter, Image, Progress } from '@nextui-org/react';
import { copyText } from '../features/copy';

type UploadedImages = {
    name: string;
    id: string;
    url: string;
    state: number;
    isUploaded: Boolean;
    isError: Boolean;
};

export default function Upload() {
    const [uploadedImages, setUploadedImages] = useState<UploadedImages[]>([]);

    const imageUpload = (file: File) => {
        const fileID = uuid();
        const storageRef = ref(storage, `uploads/${fileID}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setUploadedImages((prev) => [
            {
                name: file.name,
                id: fileID,
                state: 0,
                url: '',
                isUploaded: false,
                isError: false,
            },
            ...prev,
        ]);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setUploadedImages((prev) =>
                    prev.map((item) =>
                        item.id === fileID ? { ...item, state: progress } : item
                    )
                );
            },
            () => {
                setUploadedImages((prev) =>
                    prev.map((item) =>
                        item.id === fileID ? { ...item, isError: true } : item
                    )
                );
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUploadedImages((prev) =>
                        prev.map((item) =>
                            item.id === fileID
                                ? {
                                      ...item,
                                      url: downloadURL,
                                      isUploaded: true,
                                  }
                                : item
                        )
                    );
                });
            }
        );
    };

    const onDrop = (files: File[]) => {
        if (files.length > 0) {
            for (let i = 0; i < Math.min(files.length, 5); i++) {
                imageUpload(files[i]);
            }
        }
    };

    const { getRootProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png', '.jpg', '.jpeg'],
        },
    });

    const dropAreaBackground = isDragActive
        ? 'bg-primary-100 shadow-inset'
        : 'bg-primary-50';

    return (
        <div>
            <div>
                <div className='flex items-center gap-4'>
                    <IoDuplicate size={24} />
                    <p className='text-3xl font-bold'>アップロード</p>
                </div>
                <p className='text-sm mt-1 opacity-80'>
                    TANE Coreで利用する素材をアップロードします
                </p>
            </div>
            <div className='mt-10'>
                <div>
                    <p className='text-xl font-bold'>ファイルをアップロード</p>
                    <p className='text-sm opacity-80'>
                        ドララッグアンドドロップ又は選択してアップロードをすることができます。最大5枚までアップロードできます。
                    </p>
                </div>
                <div>
                    <div
                        {...getRootProps()}
                        className={`mt-4 py-8 rounded-xl ${dropAreaBackground}`}
                    >
                        <IoCloudUploadOutline
                            size={52}
                            className='mx-auto stroke-primary-300 fill-primary-300'
                        />
                        <div className='text-center mt-3'>
                            <p className='font-semibold opacity-80'>
                                画像をドロップ
                            </p>
                            <p className='text-sm'>or</p>
                            <p className='font-semibold opacity-80'>
                                画像を選択
                            </p>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <UploadingImagesState items={uploadedImages} />
                        <UploadedImagesState items={uploadedImages} />
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <div>
                    <p className='text-xl font-bold'>ファイルの制限</p>
                    <p className='text-sm opacity-80'>
                        ファイルアップロード時に制限されるファイルの種類やサイズを確認することができます。
                    </p>
                </div>
                <div>
                    <ul className='list-disc ml-7 flex flex-col gap-2 mt-4'>
                        <li>
                            <p>png、jpg、jpegのみの拡張子の画像</p>
                        </li>
                        <li>
                            <p>1度に最大5枚までのアップロード</p>
                        </li>
                        <li>
                            <p>1つ当たり最大2MBのサイズ</p>
                        </li>
                    </ul>
                </div>
            </div>
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
                                aria-label='Uploading...'
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
                                    item.isError ? '- アップロードエラー' : ''
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
                        <Card
                            key={item.id}
                            isFooterBlurred
                            radius='md'
                            className='border-none w-60 h-60'
                        >
                            <Image
                                className='object-cover w-60 h-60'
                                src={item.url}
                            />
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
                                    onClick={() => copyText(item.url)}
                                >
                                    Copy URL
                                </Button>
                            </CardFooter>
                        </Card>
                    )
            )}
        </div>
    );
}
