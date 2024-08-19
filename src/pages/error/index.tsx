import { BsSignDeadEnd } from 'react-icons/bs';

export default function Page() {
    return (
        <div className='w-full h-[100svh] flex justify-center items-center'>
            <div>
                <BsSignDeadEnd size={128} className='mx-auto' />
                <p className='font-extrabold text-5xl mt-6'>ゲームオーバー</p>
            </div>
        </div>
    );
}
