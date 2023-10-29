import { IoHome } from 'react-icons/io5';

export default function Home() {
    return (
        <div>
            <div>
                <div className='flex items-center gap-4'>
                    <IoHome size={24} />
                    <p className='text-3xl font-bold'>ホーム</p>
                </div>
                <p className='text-sm mt-1 opacity-80'>TANE Coreホーム</p>
            </div>
        </div>
    );
}
