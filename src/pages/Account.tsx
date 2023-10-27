import { IoPersonCircleSharp } from "react-icons/io5";

export default function Account() {
    return (
        <div className='max-w-4xl mx-auto w-full py-12 px-6'>
            <div>
                <div className='flex items-center gap-4'>
                    <IoPersonCircleSharp size={24} />
                    <p className='text-3xl font-bold'>アカウント</p>
                </div>
                <p className='text-sm mt-1 opacity-80'>
                    アカウントの設定を変更と、アカウントの削除ができます。
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