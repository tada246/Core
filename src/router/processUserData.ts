import { User as AuthUser } from 'firebase/auth';

import { User } from '../store/jotai';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../features/firebase';
import { AdminUser } from '../types/firebase';

export default async function processUserData(
    raw_user_data: AuthUser | null,
    setLoginState: (param: Number) => void,
    setUser: (param: User) => void
) {
    if (raw_user_data) {
        const docSnap = await getDoc(doc(db, 'admin_users', raw_user_data.uid));
        let user_data: AdminUser;

        if (docSnap.exists()) {
            // ある場合
            user_data = docSnap.data() as AdminUser;
        } else {
            // ない場合
            let push_user_data = {
                id: raw_user_data.uid,
                name: raw_user_data.displayName ?? '名前はまだ無い',
                photoURL: raw_user_data.photoURL ?? '',
                authority: !raw_user_data.email
                    ?.toString()
                    .endsWith('toko.ed.jp')
                    ? 'BANNED'
                    : 'READER',
                mail: raw_user_data.email ?? '',
            };
            await setDoc(doc(db, 'admin_users', raw_user_data.uid), {
                ...push_user_data,
                timestamp: serverTimestamp(),
            });
            const newDocSnap = await getDoc(
                doc(db, 'admin_users', raw_user_data.uid)
            );
            if (!newDocSnap.exists()) {
                throw new Error('ユーザーデータの作成に失敗しました');
            }
            user_data = newDocSnap.data() as AdminUser;
        }

        setUser({
            ...raw_user_data,
            data: user_data,
        });

        const loginState = user_data.authority !== 'BANNED' ? 1 : 3;
        setLoginState(loginState);
    } else {
        setLoginState(2);
        setUser(undefined);
    }
}
