import { ReactElement } from 'react';
import { Colors } from '../types/colors';
import { IoBrush, IoBug, IoBuild } from 'react-icons/io5';
import { GiHalfDead } from 'react-icons/gi';
export const authority: {
    id: string;
    name: string;
    icon: ReactElement;
    largeIcon: ReactElement;
    color: Colors;
    description: string;
}[] = [
    {
        id: 'ADMIN',
        name: '管理者',
        icon: <IoBuild />,
        largeIcon: <IoBuild size={20} />,
        color: 'danger',
        description: 'ユーザーの権限の管理が可能',
    },
    {
        id: 'EDITOR',
        name: '編集者',
        icon: <IoBrush />,
        largeIcon: <IoBrush size={20} />,
        color: 'primary',
        description: 'アプリ内での内容の編集が可能',
    },
    {
        id: 'READER',
        name: '閲覧者',
        icon: <IoBug />,
        largeIcon: <IoBug size={20} />,
        color: 'default',
        description: 'アプリ内での内容の閲覧のみ可能',
    },
    {
        id: 'BANNED',
        name: 'アクセス禁止',
        icon: <GiHalfDead />,
        largeIcon: <GiHalfDead size={20} />,
        color: 'warning',
        description: 'アプリへのアクセスが禁止されている',
    },
];
