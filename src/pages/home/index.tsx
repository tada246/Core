import { Link } from 'react-router-dom';
import { Link as NextUILink } from '@nextui-org/react';
import Head from '../../components/ui/Head';
import {
    IoDuplicate,
    IoFolderOpen,
    IoGitBranchOutline,
    IoHelp,
    IoHome,
    IoMapOutline,
    IoMegaphone,
    IoPeople,
    IoPersonCircleSharp,
} from 'react-icons/io5';

export default function Page() {
    return (
        <div>
            <Head
                icon={<IoHome size={24} />}
                title='ホーム'
                subtitle='TANE Coreホーム'
            />
            <div className='mt-10 shadow-medium drop-shadow-lg rounded-medium p-12 flex gap-12 items-center'>
                <IoMegaphone size={64} />
                <div className='flex flex-col flex-1'>
                    <p className='text-2xl font-bold text-default-600'>
                        初めて利用する場合
                    </p>
                    <p className='mt-1'>
                        説明書を準備しているので、そちらをご覧ください。
                    </p>
                    <a
                        href='http://'
                        target='_blank'
                        rel='noopener noreferrer'
                    ></a>
                    <NextUILink
                        isExternal
                        href='https://docs.google.com/document/d/1dPDTZ3W0Uc6ARrzgee3uBdWXN4ZepDEtk75_7njFf94/edit?usp=drive_link'
                        className='mt-2'
                    >
                        <div className='text-white no-underline p-2 block bg-primary-400 text-sm rounded-large'>
                            Googleドキュメントで開く
                        </div>
                    </NextUILink>
                </div>
            </div>
            <div className='grid md:grid-cols-3 grid-cols-2 mt-4 gap-4 text-default-600'>
                <Link
                    to='/map'
                    className='md:col-span-2 row-span-1 shadow-medium rounded-medium drop-shadow-lg flex justify-center items-center hover:shadow-large duration-300'
                >
                    <IoMapOutline size={42} />
                </Link>
                <Link
                    to='/user-management'
                    className='col-span-1 row-span-1 aspect-square shadow-medium rounded-medium drop-shadow-lg flex justify-center items-center hover:shadow-large duration-300'
                >
                    <IoPeople size={42} />
                </Link>
                <Link
                    to='/account'
                    className='col-span-1 row-span-1 aspect-square shadow-medium rounded-medium drop-shadow-lg flex justify-center items-center hover:shadow-large duration-300'
                >
                    <IoPersonCircleSharp size={42} />
                </Link>
                <Link
                    to='/help'
                    className='col-span-1 md:row-span-2 shadow-medium rounded-medium drop-shadow-lg flex justify-center items-center hover:shadow-large duration-300'
                >
                    <IoHelp size={42} />
                </Link>
                <Link
                    to='/images'
                    className='col-span-1 row-span-1 aspect-square shadow-medium rounded-medium drop-shadow-lg flex justify-center items-center hover:shadow-large duration-300'
                >
                    <IoFolderOpen size={42} />
                </Link>
                <Link
                    to='/for-developers'
                    className='col-span-1 row-span-1 aspect-square shadow-medium rounded-medium drop-shadow-lg flex justify-center items-center hover:shadow-large duration-300'
                >
                    <IoGitBranchOutline size={42} />
                </Link>
                <Link
                    to='/upload'
                    className='col-span-1 row-span-1 aspect-square shadow-medium rounded-medium drop-shadow-lg flex justify-center items-center hover:shadow-large duration-300'
                >
                    <IoDuplicate size={42} />
                </Link>
            </div>
        </div>
    );
}
