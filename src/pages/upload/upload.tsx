import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoCloudOfflineOutline, IoCloudUploadOutline } from 'react-icons/io5';
import { db, storage } from '../../features/firebase';
import { v4 as uuid } from 'uuid';
import { Progress } from '@nextui-org/react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { user as user_atom } from '../../store/jotai';
import { isEditor } from '../../features/allow';
import UploadImageCard from './imageCard';

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
                        .catch(() => {
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
    const isAllow =
        isEditor(user?.data?.authority ?? '') &&
        user?.data?.mail.endsWith('@toko.ed.jp');

    const { getRootProps, isDragActive, getInputProps } = useDropzone({
        onDrop,
        disabled: !isAllow,
        accept: {
            'image/png': ['.png', '.jpg', '.jpeg', '.webp', '.svg'],
        },
        noClick: false,
    });

    const dropAreaBackground = !isAllow
        ? 'bg-danger-50'
        : isDragActive
        ? 'bg-primary-100 shadow-inset'
        : 'bg-primary-50';

    return (
        <div>
            <div
                {...getRootProps()}
                className={`mt-4 py-8 rounded-xl ${dropAreaBackground} duration-200`}
            >
                <input {...getInputProps()} />
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
                    <p className='font-semibold opacity-80'>画像をドロップ</p>
                    <p className='text-sm'>or</p>
                    <p className='font-semibold opacity-80'>画像を選択</p>
                </div>
            </div>
            {uploadedImages.length !== 0 && (
                <div className='mt-5'>
                    <UploadingImagesState items={uploadedImages} />
                    <UploadedImagesState items={uploadedImages} />
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
