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
import { auth, google_provider } from '../features/firebase';

export default function Login() {
    const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

    function loginWithGoogle() {
        setIsLoginLoading(true);
        signInWithPopup(auth, google_provider)
            .then(() => {
                setIsLoginLoading(false);
            })
            .catch(() => {
                // error
            });
    }

    return (
        <div>
            <div>
                <div className='flex items-center gap-4'>
                    <IoLogInOutline size={24} />
                    <p className='text-3xl font-bold'>おかえり😊</p>
                </div>
                <p className='text-sm mt-1 opacity-80'>
                    Coreにログインする。アカウントをお持ちでない場合も、以下のボタンを押してアカウントを作成することができます。
                </p>
            </div>
            <div className='mt-10'>
                <div className='max-w-md mx-auto bg-gradient-to-br from-sky-400 to-purple-400 h-96 rounded-xl shadow flex justify-center items-center'>
                    <Card
                        isBlurred
                        shadow='sm'
                        className='w-5/6 border-none bg-background/60 dark:bg-default-100/50 py-4'
                    >
                        <CardHeader className='flex flex-col pt-6'>
                            <p className='font-bold text-2xl'>Coreへログイン</p>
                            <p className='text-sm mt-1 text-center px-2'>
                                これは、桐光学園関係者のログインのみを許可します。
                            </p>
                        </CardHeader>
                        <CardBody>
                            <div className='flex flex-col'>
                                <Button
                                    color='primary'
                                    variant='shadow'
                                    fullWidth
                                    startContent={<IoLogoGoogle size={24} />}
                                    onClick={() => loginWithGoogle()}
                                    isLoading={isLoginLoading}
                                >
                                    <p>Googleアカウントでログイン</p>
                                </Button>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className='flex gap-2 opacity-80'>
                                <div>
                                    <IoAlertCircle size={20} />
                                </div>
                                <div>
                                    <p className='text-sm'>
                                        必ず学校のメールアドレスを使用してください。
                                    </p>
                                    <p className='text-sm'>
                                        選択されたGoogleアカウントの名前、メールアドレス、プロフィール写真が収集されます。
                                    </p>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
