import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    IoCloudOfflineOutline,
    IoCloudUploadOutline,
    IoDuplicate,
} from 'react-icons/io5';
import { db, storage } from '../../features/firebase';
import { v4 as uuid } from 'uuid';
import { Button, Card, CardFooter, Image, Progress } from '@nextui-org/react';
import { copyText } from '../../features/copy';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Head from '../../components/ui/Head';
import SubHead from '../../components/ui/SubHead';
import UploadDescription from './description';
import { useAtom } from 'jotai';
import { user as user_atom } from '../../store/jotai';
import { isEditor } from '../../features/allow';

type UploadedImages = {
    name: string;
    id: string;
    url: string;
    state: number;
    isUploaded: Boolean;
    isError: Boolean;
};

export default function Page() {
    const [uploadedImages, setUploadedImages] = useState<UploadedImages[]>([]);
    const [user] = useAtom(user_atom);

    async function createImageDatabase(id: string, url: string) {
        await setDoc(doc(db, 'images', id), {
            id: id,
            url: url,
            timestamp: serverTimestamp(),
        });
    }

    const imageUpload = (file: File) => {
        const fileID = uuid();
        const storageRef = ref(storage, `uploads/${fileID}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // 画面のアップロード状況を表示するためのstateを更新
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
                    createImageDatabase(fileID, downloadURL)
                        .then(() => {
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
                        })
                        .catch((e) => {
                            console.error(e);
                            setUploadedImages((prev) =>
                                prev.map((item) =>
                                    item.id === fileID
                                        ? { ...item, isError: true }
                                        : item
                                )
                            );
                        });
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

    // ⇩ 安全じゃないから後で修正
    const isAllow = isEditor(user?.data?.authority ?? '');

    const { getRootProps, isDragActive } = useDropzone({
        onDrop,
        disabled: !isAllow,
        accept: {
            'image/png': ['.png', '.jpg', '.jpeg', '.webp', '.svg'],
        },
    });

    const dropAreaBackground = !isAllow
        ? 'bg-danger-50'
        : isDragActive
        ? 'bg-primary-100 shadow-inset'
        : 'bg-primary-50';

    return (
        <div>
            <Head
                title='アップロード'
                subtitle='TANE Coreで利用する素材をアップロードします'
                icon={<IoDuplicate size={24} />}
            />
            <SubHead
                title='ファイルをアップロード'
                subtitle='ドラッグアンドドロップ又は選択してアップロードをすることができます。最大5枚までアップロードできます。'
                className='mt-10'
            >
                <div>
                    <div
                        {...getRootProps()}
                        className={`mt-4 py-8 rounded-xl ${dropAreaBackground}`}
                    >
                        {!isAllow && (
                            <IoCloudOfflineOutline
                                size={52}
                                className='mx-auto stroke-danger-300 fill-danger-300'
                            />
                        )}
                        {isAllow && (
                            <IoCloudUploadOutline
                                size={52}
                                className='mx-auto stroke-primary-300 fill-primary-300'
                            />
                        )}
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
                    {uploadedImages.length !== 0 && (
                        <div className='mt-5'>
                            <UploadingImagesState items={uploadedImages} />
                            <UploadedImagesState items={uploadedImages} />
                        </div>
                    )}
                </div>
            </SubHead>
            <SubHead
                title='アップロードの制限'
                subtitle='ファイルアップロード時に制限されるファイルの種類やサイズを確認が可能'
                className='mt-10'
            >
                <UploadDescription />
            </SubHead>
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
