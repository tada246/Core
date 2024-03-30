import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    IoAnalyticsOutline,
    IoApps,
    IoArrowBackOutline,
    IoArrowForwardOutline,
    IoDuplicate,
    IoFolderOpen,
    IoHelp,
    IoHelpOutline,
    IoHome,
    IoMapOutline,
    IoPeople,
    IoPersonCircleSharp,
} from 'react-icons/io5';
import {
    Button,
    Divider,
    Image,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Link as NextUILink,
} from '@nextui-org/react';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { user as user_atom } from '../../store/jotai';

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
        name: 'マップイベント',
        icon: <IoMapOutline />,
        link: '/map',
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
        name: 'ヘルプ',
        icon: <IoHelpOutline />,
        link: '/help',
    },
];

export default function SideBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const [user] = useAtom(user_atom);
    const navigate = useNavigate();

    if (!user || !user.data) return null;

    return (
        <div>
            <div className='w-60 md:block hidden'>
                <div className='w-60 border-r border-default h-screen fixed top-0 left-0 flex flex-col items-center py-4'>
                    <ul className='w-52 flex flex-col gap-1 flex-1'>
                        {sidebar_content.map((content, index) => (
                            <li key={index}>
                                {content.name !== 'border' ? (
                                    <Button
                                        color='default'
                                        variant={
                                            `/${
                                                location.pathname.split('/')[1]
                                            }` === content.link
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
                    <div className='w-52 bg-default-900 rounded-medium flex justify-evenly items-center p-1 shadow-large'>
                        <Button
                            variant='light'
                            isIconOnly
                            className='text-white'
                            size='sm'
                            onClick={() => navigate(-1)}
                        >
                            <IoArrowBackOutline />
                        </Button>
                        <Button
                            variant='light'
                            isIconOnly
                            className='text-white'
                            size='sm'
                            onClick={() => navigate(1)}
                        >
                            <IoArrowForwardOutline />
                        </Button>
                        <Divider
                            orientation='vertical'
                            className='bg-default-600 h-5'
                        />
                        <Button
                            variant='light'
                            isIconOnly
                            className='text-white'
                            size='sm'
                            as={Link}
                            to='/help'
                        >
                            <IoHelp />
                        </Button>
                        <Button
                            variant='light'
                            isIconOnly
                            className='text-white'
                            size='sm'
                            as={NextUILink}
                            href='https://drive.google.com/drive/folders/1or5eg7FhQ7_v8C7Hxox_Jp13a9Pw28gj'
                            isExternal
                        >
                            <IoApps />
                        </Button>
                        <Image
                            src={user?.data?.photoURL}
                            className='w-5 h-5 mx-1 rounded-full'
                            alt='user'
                        />
                    </div>
                </div>
            </div>
            <div className='md:hidden'>
                <Navbar
                    onMenuOpenChange={setIsMenuOpen}
                    className='fixed top-0'
                    isMenuOpen={isMenuOpen}
                >
                    <NavbarContent>
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            className='md:hidden'
                        />
                        <NavbarBrand>
                            <p className='font-bold text-inherit'>Core</p>
                        </NavbarBrand>
                    </NavbarContent>
                    <NavbarMenu className='flex flex-col gap-3'>
                        {sidebar_content.map((content, index) => (
                            <div key={index}>
                                {content.name !== 'border' ? (
                                    <NavbarMenuItem key={index}>
                                        <Link
                                            to={content.link}
                                            className='flex items-center gap-2'
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {content.icon}
                                            <p className='text-default-500'>
                                                {content.name}
                                            </p>
                                        </Link>
                                    </NavbarMenuItem>
                                ) : (
                                    <div className='border-t border-default'></div>
                                )}
                            </div>
                        ))}
                    </NavbarMenu>
                </Navbar>
            </div>
        </div>
    );
}
