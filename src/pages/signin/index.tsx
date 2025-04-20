import { Button, Input } from '@nextui-org/react';
import { getAuth } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { IoGlobeOutline } from 'react-icons/io5';
import { db } from '../../features/firebase';
import { userConverter } from '../../converters/users';
import useUser from '../../hooks/useUser';

interface UserCreateForm {
    name: string;
}

export default function Page() {
    // react form hookを使って、名前を入力するフォームを作成します。
    const user = getAuth().currentUser;
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<UserCreateForm>({
        defaultValues: {
            name: user?.displayName ?? '',
        },
    });
    const { mutateUser } = useUser(user?.uid);

    const onSubmit = async (data: UserCreateForm) => {
        if (!user) {
            return;
        }

        await setDoc(doc(db, 'users', user?.uid).withConverter(userConverter), {
            id: user.uid,
            name: data.name,
            photoURL: user.photoURL ?? '',
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
            mail: user.email ?? '',
            isDisabled: false,
        }).then(() => {
            mutateUser();
        });
    };

    return (
        <div className='flex bg-primary-50 w-full justify-between h-[100svh]'>
            <div className='flex-1 w-1/2'></div>
            <div className='flex-1 w-1/2 h-full flex justify-center items-center top-0 left-0 px-12'>
                <form
                    className='w-[calc(100%-6rem)] h-[calc(100%-6rem)] shadow-medium rounded-large bg-white dark:bg-black p-12 flex flex-col'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='flex-1'>
                        <IoGlobeOutline size={64} className='mx-auto' />
                        <div className='mt-6'>
                            <h1 className='text-center text-2xl font-bold mt-4'>
                                名前
                            </h1>
                            <p className='text-center'>
                                この名前は、アプリに登録した他のユーザーに表示されます。
                            </p>
                        </div>
                        <Input
                            className='mt-4'
                            label='名前'
                            {...register('name')}
                        />
                    </div>
                    <Button
                        color='primary'
                        variant='shadow'
                        size='md'
                        type='submit'
                        isLoading={isSubmitting}
                        isDisabled={!user}
                    >
                        アカウントを作成
                    </Button>
                </form>
            </div>
        </div>
    );
}
