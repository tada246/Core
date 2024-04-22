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
import Head from '../../components/ui/Head';
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
        <div>
            <Head
                icon={<IoLogInOutline size={24} />}
                title={<OkaeriNasai />}
                subtitle='Coreにログインする。アカウントがない場合も、以下のボタンを押してアカウントを作成することができます。'
            />
            <div className='mt-10'>
                <div className='max-w-md mx-auto bg-gradient-to-br from-sky-400 to-purple-400 py-10 rounded-xl shadow flex justify-center items-center'>
                    <Card
                        isBlurred
                        shadow='sm'
                        className='w-5/6 border-none bg-background/60 dark:bg-default-100/50 py-4'
                    >
                        <CardHeader className='flex flex-col pt-6'>
                            <p className='font-bold text-2xl'>Coreへログイン</p>
                            <p className='text-sm mt-1 text-center px-2'>
                                @toko.ed.jpのみのアカウントを許可しています。
                            </p>
                        </CardHeader>
                        <CardBody>
                            <div className='flex flex-col'>
                                <Button
                                    color='primary'
                                    variant='shadow'
                                    fullWidth
                                    startContent={<IoLogoGoogle size={20} />}
                                    onClick={() => loginWithGoogle()}
                                    isLoading={isLoginLoading}
                                >
                                    <p>Login with Google</p>
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

function OkaeriNasai() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <p
            className='text-3xl font-bold'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            おかえりなさい
            {isHovered && (
                <span className=''>
                    ませご主人様！
                    <span className='text-sm'>（代表の人が提案しました）</span>
                </span>
            )}
        </p>
    );
}
