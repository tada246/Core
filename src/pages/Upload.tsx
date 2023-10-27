import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline, IoDuplicate } from 'react-icons/io5';

export default function Upload() {
    const onDrop = (files: File[]) => {
        if (files.length > 0) {
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
        <div className='max-w-4xl mx-auto w-full py-12 px-6'>
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
                        ドララッグアンドドロップ又は選択してアップロードをすることができます。
                    </p>
                </div>
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
                        <p className='font-semibold opacity-80'>画像を選択</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
