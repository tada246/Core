import { IoFolderOpen } from "react-icons/io5";

export default function AllImages() {
    return (
        <div className='max-w-4xl mx-auto w-full py-12 px-6'>
            <div>
                <div className='flex items-center gap-4'>
                    <IoFolderOpen size={24} />
                    <p className='text-3xl font-bold'>画像一覧</p>
                </div>
                <p className='text-sm mt-1 opacity-80'>
                    Coreで保存されている画像を一覧で表示します
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