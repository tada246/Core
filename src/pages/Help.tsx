import { IoHelpOutline } from "react-icons/io5";

export default function Help() {
    return (
        <div className='max-w-4xl mx-auto w-full mt-12'>
            <div>
                <div className='flex items-center gap-4'>
                    <IoHelpOutline size={24} />
                    <p className='text-3xl font-bold'>ヘルプ</p>
                </div>
                <p className='text-sm mt-1 opacity-80'>
                    このアプリの使い方を紹介します
                </p>
            </div>
            <div className='mt-10'>
                <div>
                    <p className='text-xl font-bold'>タイトル</p>
                    <p className='text-sm opacity-80'>
                        説明
                    </p>
                </div>
                <div className='mt-4 flex gap-4'></div>
            </div>
        </div>
    );
}