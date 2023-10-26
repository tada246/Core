import { Link } from 'react-router-dom';
import {
    IoAnalyticsOutline,
    IoDuplicate,
    IoExitOutline,
    IoFolderOpen,
    IoGitBranchOutline,
    IoHelpOutline,
    IoHome,
    IoMapOutline,
    IoPawSharp,
    IoPeople,
    IoPersonCircleSharp,
} from 'react-icons/io5';
import { Button } from '@nextui-org/react';

interface SidebarContent {
    name: string;
    link: string;
    icon: JSX.Element;
}

const sidebar_content: SidebarContent[] = [
    {
        name: 'ホーム',
        icon: <IoHome />,
        link: '/',
    },
    {
        name: 'アナリティクス',
        icon: <IoAnalyticsOutline />,
        link: '/',
    },
    {
        name: 'ユーザー管理',
        icon: <IoPeople />,
        link: '/',
    },
    {
        name: 'Map',
        icon: <IoMapOutline />,
        link: '/',
    },
    {
        name: '輝緑祭公式ページ',
        icon: <IoPawSharp />,
        link: '/',
    },
    {
        name: 'border',
        icon: <div />,
        link: '',
    },
    {
        name: '画像一覧',
        icon: <IoFolderOpen />,
        link: '/',
    },
    {
        name: '画像アップロード',
        icon: <IoDuplicate />,
        link: '/upload',
    },
    {
        name: 'border',
        icon: <div />,
        link: '',
    },
    {
        name: 'アカウント',
        icon: <IoPersonCircleSharp />,
        link: '/',
    },
    {
        name: 'サインアウト',
        icon: <IoExitOutline />,
        link: '/',
    },
    {
        name: 'border',
        icon: <div />,
        link: '',
    },
    {
        name: 'ヘルプ',
        icon: <IoHelpOutline />,
        link: '/help',
    },
    {
        name: '開発者用',
        icon: <IoGitBranchOutline />,
        link: '/for-developers',
    },
];

export default function SideBar() {
    return (
        <div className='w-60 border-r border-default h-screen'>
            <ul className='w-52 mx-auto mt-4 flex flex-col gap-1'>
                {sidebar_content.map((content, index) => (
                    <li key={index}>
                        {content.name !== 'border' ? (
                            <Button
                                color='default'
                                variant='light'
                                fullWidth
                                startContent={content.icon}
                                as={Link}
                                to={content.link}
                                className='justify-start'
                            >
                                <p className='text-size-[0.8rem]'>
                                    {content.name}
                                </p>
                            </Button>
                        ) : (
                            <div className='border-t border-default'></div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
