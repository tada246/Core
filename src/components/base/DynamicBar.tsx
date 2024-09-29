import { useAtom } from 'jotai';
import { clipboardAtom } from '../../store/jotai';
import { IoClose, IoCopy, IoImage, IoList } from 'react-icons/io5';
import dayjs from 'dayjs';
import {
    Button,
    Chip,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Spinner,
} from '@nextui-org/react';
import { copyText } from '../../features/copy';
import useWindowSize from '../../hooks/useWindowSize';
import { user as user_atom } from '../../store/jotai';
import { authority } from '../../store/authority';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAllImages from '../../hooks/useAllImages';
import { userCanUploadImages } from '../../features/getAuthority';

export default function DynamicBar() {
    const [clipboard, setClipboard] = useAtom(clipboardAtom);
    const [width] = useWindowSize();
    const [user] = useAtom(user_atom);

    const location = useLocation();
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        setHistory((prevHistory) => [location.pathname, ...prevHistory]);
    }, [location]);

    const userAuthority = authority.filter(
        (auth) => auth.id === user?.data?.authority
    )[0];

    if (!user || !user.data) return null;

    function deleteItem(index: number) {
        setClipboard((prev) => prev.filter((_, i) => i !== index));
    }

    if (width < 1300) return;

    return (
        <div className='fixed flex bottom-0 right-[calc((100%-15rem)/2)] translate-x-1/2 z-50 gap-2 rounded-t-large bg-white/40 backdrop-blur-md shadow-medium px-4 py-3 divide-x-1 items-center'>
            <div className='flex flex-col gap-1'>
                <p className='text-tiny text-default-600'>権限</p>
                <div className='flex items-center divide-x-1 divide-default-200 h-8'>
                    <Chip
                        color={userAuthority.color}
                        variant='flat'
                        size='sm'
                        startContent={userAuthority.icon}
                        className='pl-2 rounded-r-none'
                    >
                        {userAuthority.name}
                    </Chip>
                    <Chip
                        variant='flat'
                        size='sm'
                        className='pr-2 rounded-l-none'
                        color='secondary'
                    >
                        {userCanUploadImages(user.data.mail)
                            ? 'アップ可能'
                            : 'アップ不可'}
                    </Chip>
                </div>
            </div>
            <div className='flex flex-col gap-1 px-4'>
                <p className='text-tiny text-default-600'>コピー</p>
                <div className='flex items-center gap-4 h-8'>
                    <p className='text-tiny'>{clipboard.length}件</p>
                    <Popover placement='top' size='sm' showArrow offset={12}>
                        <PopoverTrigger>
                            <Button isIconOnly variant='flat' size='sm'>
                                <IoList />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='p-6'>
                            <div className='w-96 max-h-[40rem] overflow-auto flex flex-col gap-0 divide-y-1'>
                                {clipboard.map((item, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center gap-2 py-2'
                                    >
                                        <div className='flex-1'>
                                            <p className='text-sm text-default-800'>
                                                {item.text}
                                            </p>
                                            <p className='text-tiny text-default-600'>
                                                {dayjs(item.timestamp).format(
                                                    'YYYY/MM/DD HH:mm:ss'
                                                )}
                                            </p>
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <Button
                                                size='sm'
                                                variant='flat'
                                                isIconOnly
                                                onClick={() =>
                                                    copyText(item.text)
                                                }
                                            >
                                                <IoCopy />
                                            </Button>
                                            <Button
                                                size='sm'
                                                variant='flat'
                                                isIconOnly
                                                onClick={() =>
                                                    deleteItem(index)
                                                }
                                            >
                                                <IoClose />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {clipboard.length === 0 && (
                                <p className='text-tiny text-default-600'>
                                    クリップボードには何もありません
                                </p>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className='flex flex-col gap-1 px-4 pr-8'>
                <p className='text-tiny text-default-600'>リンク</p>
                <div className='h-8 flex items-center'>
                    <p className='text-tiny'>{history.length}件</p>
                </div>
            </div>
            <div className='flex flex-col gap-1 px-4'>
                <p className='text-tiny text-default-600'>画像</p>
                <div className='h-8 flex items-center'>
                    <Popover placement='top' showArrow offset={12}>
                        <PopoverTrigger>
                            <Button
                                variant='flat'
                                size='sm'
                                className='text-default-600'
                                startContent={<IoImage />}
                            >
                                一覧
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='p-6 max-h-[40rem]'>
                            <ImageList />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}

export function ImageList() {
    const { data, isLoading, error, loadMoreImages, isLast } = useAllImages();

    if (error) return <p>エラーが発生しました</p>;
    if (isLoading) return <Spinner label='読み込み中' />;

    return (
        <div className='overflow-y-auto'>
            <div className='grid grid-cols-2 gap-6'>
                {data?.map((image) => (
                    <div
                        key={image.id}
                        className='flex items-center gap-2 w-full justify-center'
                    >
                        <div className='relative'>
                            <img
                                src={image.url}
                                width={100}
                                height={100}
                                alt={'画像'}
                                style={{
                                    width: '7rem',
                                    height: '7rem',
                                }}
                                className='object-cover w-28 h-28 rounded-medium'
                            />
                            <Button
                                className='absolute bottom-2 right-2 bg-white/40 backdrop-blur-md rounded-full'
                                isIconOnly
                                size='sm'
                                variant='flat'
                                color='default'
                                onClick={() => copyText(image.url)}
                            >
                                <IoCopy className='text-default-800' />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            {!isLast && (
                <Button
                    fullWidth
                    variant='flat'
                    color='primary'
                    onClick={() => loadMoreImages()}
                    className='mt-6'
                    size='md'
                >
                    もっと読み込む
                </Button>
            )}
        </div>
    );
}
