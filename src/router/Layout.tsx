import { ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../features/firebase';
import { LoadingPage, LoginPage, SignInPage } from '../pages';
import { Toaster } from 'react-hot-toast';
import ToastBar from './ToastBar';
import useUser from '../hooks/useUser';
import Header from '../components/ui/Header';

type Props = {
    children: ReactNode;
};

export default function Layout(props: Props) {
    const [uid, setUid] = useState<string | undefined>();
    const { user, userNotFound, userFetchError, userFetchLoading } =
        useUser(uid);

    useEffect(() => {
        onAuthStateChanged(auth, (_user) => {
            setUid(_user?.uid ?? '');
        });
    }, []);

    if (uid == undefined) {
        // ローディング
        return <LoadingPage />;
    }

    if (uid === '') {
        // 未ログイン
        return <LoginPage />;
    }

    if (!user && userFetchLoading) {
        // ローディング
        return <LoadingPage />;
    }

    if (userFetchError) {
        // エラー
    }

    if (userNotFound) {
        // アカウント未作成
        return <SignInPage />;
    }

    return (
        <main className='font-noto'>
            <Toaster>{(t) => <ToastBar toast={t} />}</Toaster>
            {props.children}
            <Header />
        </main>
    );
}
