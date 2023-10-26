import { IoDuplicate } from "react-icons/io5";

export default function Upload() {
    return (
        <div className='max-w-4xl mx-auto w-full mt-12'>
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
                    <p className='text-xl font-bold'>タイトル</p>
                    <p className='text-sm opacity-80'>説明</p>
                </div>
                <div className='mt-4 flex gap-4'></div>
            </div>
        </div>
    );
}