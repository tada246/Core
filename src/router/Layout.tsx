import { ReactNode, useEffect, useState } from 'react';
import SideBar from '../components/base/SideBar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../features/firebase';
import { BannedPage, LoadingPage, Login } from '../pages';
import { Toaster } from 'react-hot-toast';
import { useAtom } from 'jotai';
import { user as user_atom } from '../store/jotai';
import processUserData from './processUserData';
import ToastBar from './ToastBar';
import RightChip from '../components/base/RightChip';

type Props = {
    children: ReactNode;
};

export default function Layout(props: Props) {
    // 0: ログインチェック中, 1: ログイン済み, 2: 未ログイン, 3: バン済み
    const [loginState, setLoginState] = useState<Number>(0);
    const [_, setUser] = useAtom(user_atom);

    useEffect(() => {
        onAuthStateChanged(auth, (_user) => {
            processUserData(_user, setLoginState, setUser);
        });
    }, []);

    return (
        <main className='flex font-noto'>
            <SideBar />
            <RightChip />
            <Toaster>{(t) => <ToastBar toast={t} />}</Toaster>
            <div className='max-w-4xl mx-auto w-full pb-12 px-6 pt-24 md:pt-12'>
                <Content state={loginState}>{props.children}</Content>
            </div>
        </main>
    );
}

type ContentProps = {
    state: Number;
    children: ReactNode;
};

function Content(props: ContentProps) {
    const { state } = props;

    if (state === 0) {
        return <LoadingPage />;
    }

    if (state === 2) {
        return <Login />;
    }

    if (state === 3) {
        return <BannedPage />;
    }

    if (state === 1) {
        return props.children;
    }

    return <>エラー</>;
}
