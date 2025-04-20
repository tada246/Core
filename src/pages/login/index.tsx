import { useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from '@nextui-org/react';
import { signInWithPopup } from 'firebase/auth';
import { IoAlertCircle, IoLogInOutline, IoLogoGoogle } from 'react-icons/io5';
import { auth, google_provider } from '../../features/firebase';
import toast from 'react-hot-toast';

export default function Page() {
    const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

    function loginWithGoogle() {
        setIsLoginLoading(true);
        signInWithPopup(auth, google_provider)
            .then(() => {
                setIsLoginLoading(false);
            })
            .catch(() => {
                toast.error('ログインに失敗しました。');
            });
    }

    return (
        <div className='flex bg-primary-50 w-full justify-between h-[100svh]'>
            <div className='flex-1 w-1/2'></div>
            <div className='flex-1 w-1/2 h-full flex justify-center items-center top-0 left-0 px-12'>
                <div className='w-[calc(100%-6rem)] h-[calc(100%-6rem)] shadow-medium rounded-large bg-white dark:bg-black p-12 flex flex-col'>
                    <div className='flex-1'>
                        {/* <IoGlobeOutline size={64} className='mx-auto' /> */}
                        <div className='mt-6'>
                            <h1 className='text-center text-2xl font-bold mt-4'>
                                ログイン
                            </h1>
                            <p className='text-center'>
                                TANE Map Console
                                にログインするには、Googleアカウントが必要です。
                            </p>
                        </div>
                    </div>
                    <Button
                        variant='bordered'
                        size='md'
                        type='submit'
                        onClick={loginWithGoogle}
                        isLoading={isLoginLoading}
                        startContent={<IoLogoGoogle />}
                    >
                        Googleでログイン
                    </Button>
                </div>
            </div>
        </div>
    );
}
