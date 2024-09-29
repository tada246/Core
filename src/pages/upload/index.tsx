import { IoDuplicate } from 'react-icons/io5';
import Head from '../../components/ui/Head';
import SubHead from '../../components/ui/SubHead';
import UploadDescription from './description';
import RecommendedUpload from './recommended';
import Upload from './upload';
import ImageCompressor from './compression';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { user as user_atom } from '../../store/jotai';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, storage } from '../../features/firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { isEditor } from '../../features/allow';
import { useDropzone } from 'react-dropzone';

export type UploadedImages = {
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
            for (let i = 0; i < Math.min(files.length, 11); i++) {
                imageUpload(files[i]);
            }
        }
    };

    // ⇩ 安全じゃないから後で修正
    const isAllow =
        isEditor(user?.data?.authority ?? '') &&
        user?.data?.mail.endsWith('@toko.ed.jp')
            ? true
            : false;

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
            <Head
                title='アップロード'
                subtitle='TANE Coreで利用する素材をアップロードします'
                icon={<IoDuplicate size={24} />}
            />
            <SubHead
                title='ファイルをアップロード'
                subtitle='ドラッグアンドドロップ又は選択してアップロードをすることができます。最大10枚まで同時アップロードできます。'
                className='mt-10'
            >
                <Upload
                    isAllow={isAllow}
                    dropAreaBackground={dropAreaBackground}
                    uploadedImages={uploadedImages}
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                />
            </SubHead>
            <SubHead
                title='ファイルを圧縮'
                subtitle='アップロードできるぎりぎりのサイズに圧縮を行うことができます。'
                className='mt-10'
            >
                <ImageCompressor imageUpload={imageUpload} isAllow={isAllow} />
            </SubHead>
            <SubHead
                title='アップロードの制限'
                subtitle='ファイルアップロード時に制限されるファイルの種類やサイズを確認が可能'
                className='mt-10'
            >
                <UploadDescription />
            </SubHead>
            <SubHead
                title='推奨する画像設定'
                subtitle='画像のアップロード時に推奨する設定を確認が可能'
                className='mt-10'
            >
                <RecommendedUpload />
            </SubHead>
        </div>
    );
}
