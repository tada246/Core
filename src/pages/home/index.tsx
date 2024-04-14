import { Link } from 'react-router-dom';
import Head from '../../components/ui/Head';
import {
    IoAnalyticsOutline,
    IoDuplicate,
    IoFolderOpen,
    IoGitBranchOutline,
    IoHelp,
    IoHome,
    IoMapOutline,
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
            <div className='grid md:grid-cols-3 grid-cols-2 mt-10 gap-4 text-default-600'>
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
