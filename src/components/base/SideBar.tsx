import { Link, useLocation } from 'react-router-dom';
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
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@nextui-org/react';
import { useState } from 'react';

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
        link: '/analytics',
    },
    {
        name: 'ユーザー管理',
        icon: <IoPeople />,
        link: '/user-management',
    },
    {
        name: 'Map',
        icon: <IoMapOutline />,
        link: '/map',
    },
    {
        name: '輝緑祭公式ページ',
        icon: <IoPawSharp />,
        link: '/school-festival',
    },
    {
        name: 'border',
        icon: <div />,
        link: '',
    },
    {
        name: '画像一覧',
        icon: <IoFolderOpen />,
        link: '/images',
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
        link: '/account',
    },
    {
        name: 'サインアウト',
        icon: <IoExitOutline />,
        link: '/signout',
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <div>
            <div className='w-60 sm:block hidden'>
                <div className='w-60 border-r border-default h-screen fixed top-0 left-0'>
                    <ul className='w-52 mx-auto mt-4 flex flex-col gap-1'>
                        {sidebar_content.map((content, index) => (
                            <li key={index}>
                                {content.name !== 'border' ? (
                                    <Button
                                        color='default'
                                        variant={
                                            location.pathname === content.link
                                                ? 'flat'
                                                : 'light'
                                        }
                                        fullWidth
                                        startContent={content.icon}
                                        as={Link}
                                        to={content.link}
                                        className='justify-start'
                                    >
                                        {content.name}
                                    </Button>
                                ) : (
                                    <div
                                        className='border-t border-default'
                                        key={index}
                                    ></div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='sm:hidden'>
                <Navbar
                    onMenuOpenChange={setIsMenuOpen}
                    className='fixed top-0'
                >
                    <NavbarContent>
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            className='sm:hidden'
                        />
                        <NavbarBrand>
                            <p className='font-bold text-inherit'>Core</p>
                        </NavbarBrand>
                    </NavbarContent>
                    <NavbarMenu className='flex flex-col gap-3'>
                        {sidebar_content.map((content, index) => (
                            <li key={index}>
                                {content.name !== 'border' ? (
                                    <NavbarMenuItem key={index}>
                                        <Link
                                            to={content.link}
                                            className='flex items-center gap-2'
                                        >
                                            {content.icon}
                                            <p>{content.name}</p>
                                        </Link>
                                    </NavbarMenuItem>
                                ) : (
                                    <div
                                        className='border-t border-default'
                                        key={index}
                                    ></div>
                                )}
                            </li>
                        ))}
                    </NavbarMenu>
                </Navbar>
            </div>
        </div>
    );
}
