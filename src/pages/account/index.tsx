import {
    Button,
    Chip,
    Image,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import { IoExitOutline, IoPersonCircleSharp } from 'react-icons/io5';
import { auth } from '../../features/firebase';
import { signOut } from 'firebase/auth';
import { useAtom } from 'jotai';
import { user as user_atom } from '../../store/jotai';
import { authority } from '../../store/authority';
import dayjs from 'dayjs';
import Head from '../../components/ui/Head';
import SubHead from '../../components/ui/SubHead';

export default function Page() {
    const [user] = useAtom(user_atom);

    if (!user || !user.data) return;

    const { data } = user;

    const table_data: { target: string; data: string; detail: string }[] = [
        {
            target: '作成日時',
            data: dayjs(user.metadata.creationTime).format('YYYY/MM/DD HH:mm'),
            detail: 'アカウントが作成された日時',
        },
        {
            target: '最終ログイン',
            data: dayjs(user.metadata.lastSignInTime).format(
                'YYYY/MM/DD HH:mm'
            ),
            detail: '最後にログインした日時',
        },
        {
            target: 'プロバイダID',
            data:
                user.providerId[0].toLocaleUpperCase() +
                user.providerId.slice(1).toLowerCase(),
            detail: '認証サービスのID',
        },
        {
            target: 'アノニマス化',
            data: user.isAnonymous ? '有効' : '無効',
            detail: '匿名化が有効かどうか',
        },
        {
            data: user.uid,
            target: 'ユーザー識別ID',
            detail: 'ユーザーの識別ID',
        },
    ];

    return (
        <div>
            <Head
                icon={<IoPersonCircleSharp size={24} />}
                title='アカウント'
                subtitle='アカウントの情報の確認またはサインアウトが可能です。'
            />
            <SubHead
                title='パブリック'
                subtitle='現在このアプリ内で公開されている情報です。この情報はあなたと管理者しか見れないと思います！'
                className='mt-10'
            >
                <div className='mt-4 flex gap-4 flex-col'>
                    <div className='p-6 bg-white shadow-medium flex gap-6 items-center rounded-large'>
                        <Image
                            radius='full'
                            src={data.photoURL}
                            width={120}
                            height={120}
                            className='w-16 h-16'
                        />
                        <div>
                            <Chip
                                startContent={
                                    authority.filter(
                                        (auth) => auth.id === data.authority
                                    )[0].icon
                                }
                                size='sm'
                                className='text-tiny mt-2 px-2'
                                variant='faded'
                            >
                                {
                                    authority.filter(
                                        (auth) => auth.id === data.authority
                                    )[0].name
                                }
                            </Chip>
                            <p className='text-lg font-bold'>{data.name}</p>
                            <p className='text-tiny opacity-60'>{data.mail}</p>
                        </div>
                    </div>
                </div>
            </SubHead>
            <SubHead
                title='認証情報'
                subtitle='認証サービスによるアカウント情報です'
                className='mt-10'
            >
                <Table className='mt-4' aria-label='user info table'>
                    <TableHeader>
                        <TableColumn>対象</TableColumn>
                        <TableColumn>情報</TableColumn>
                        <TableColumn>詳細</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {table_data.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell className='text-nowrap'>
                                    {data.target}
                                </TableCell>
                                <TableCell className='text-nowrap'>
                                    {data.data}
                                </TableCell>
                                <TableCell className='text-nowrap'>
                                    {data.detail}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </SubHead>
            <SubHead
                title='サインアウト'
                subtitle='このアカウントからサインアウトします'
                className='mt-10'
            >
                <div className='mt-4'>
                    <div className='max-w-sm'>
                        <Button
                            variant='shadow'
                            color='secondary'
                            fullWidth
                            startContent={<IoExitOutline size={18} />}
                            onClick={() => signOut(auth)}
                        >
                            サインアウト
                        </Button>
                    </div>
                </div>
            </SubHead>
        </div>
    );
}
