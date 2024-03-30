import { ReactElement } from 'react';
import { IoAlertCircleOutline, IoVolumeMediumOutline } from 'react-icons/io5';
import { IoReaderOutline } from 'react-icons/io5';
import { Colors } from '../types/colors';

export const writer: string[] = [
    '学校',
    '生徒会本部',
    '装飾（文化祭実行委員）',
    '総務（文化祭実行委員）',
    '備品（文化祭実行委員）',
    '広報（文化祭実行委員）',
    'システム',
];

export const message_type: {
    id: string;
    name: string;
    icon: ReactElement;
    largeIcon: ReactElement;
    color: Colors;
}[] = [
    {
        id: 'normal',
        name: '一般',
        icon: <IoReaderOutline />,
        largeIcon: <IoReaderOutline size={20} />,
        color: 'primary',
    },
    {
        id: 'emergency',
        name: '緊急',
        icon: <IoAlertCircleOutline />,
        largeIcon: <IoAlertCircleOutline size={20} />,
        color: 'danger',
    },
    {
        id: 'promotion',
        name: '宣伝',
        icon: <IoVolumeMediumOutline />,
        largeIcon: <IoVolumeMediumOutline size={20} />,
        color: 'secondary',
    },
];
