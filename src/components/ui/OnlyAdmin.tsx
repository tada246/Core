import { useAtom } from 'jotai';
import { ReactNode } from 'react';
import { user as user_atom } from '../../store/jotai';
import { isAdmin } from '../../features/allow';

type Props = {
    children?: ReactNode;
};

export default function OnlyAdmin(props: Props) {
    const [user] = useAtom(user_atom);

    if (!user || !user.data) return <></>;

    const isAllowed = isAdmin(user.data.authority);

    if (!isAllowed) return <></>;

    return props.children;
}
