import { useEffect, useState } from 'react';
import SideBar from '../components/base/SideBar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../features/firebase';
import Loading from '../components/base/Loading';
import { Login } from '../pages';

type Props = {
    children: React.ReactNode;
};

export default function Layout(props: Props) {
    const [loginState, setLoginState] = useState<Number>(0);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoginState(1);
            } else {
                setLoginState(2);
            }
        });
    }, []);

    return (
        <main className='flex font-noto'>
            <SideBar />
            <div className='max-w-4xl mx-auto w-full pb-12 px-6 pt-24 sm:pt-12'>
                {loginState === 0 && <Loading />}
                {loginState === 1 && props.children}
                {loginState === 2 && <Login />}
            </div>
        </main>
    );
}
