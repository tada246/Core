import { Button } from '@nextui-org/react';
import { IoExitOutline, IoPersonCircleSharp } from 'react-icons/io5';
import { auth } from '../features/firebase';
import { signOut } from 'firebase/auth';

export default function Account() {
    return (
        <div>
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
                    <p className='text-xl font-bold'>アカウント情報</p>
                    <p className='text-sm opacity-80'>
                        現在のアカウントの情報を確認できます
                    </p>
                </div>
                <div className='mt-4 flex gap-4'></div>
            </div>
            <div className='mt-10'>
                <div>
                    <p className='text-xl font-bold'>サインアウト</p>
                    <p className='text-sm opacity-80'>
                        Coreからサインアウトします
                    </p>
                </div>
                <div className='mt-4'>
                    <div className='max-w-sm'>
                        <Button
                            variant='shadow'
                            color='secondary'
                            fullWidth
                            startContent={<IoExitOutline size={18} />}
                            onClick={() => signOut(auth)}
                        >
                            サインアウト
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
