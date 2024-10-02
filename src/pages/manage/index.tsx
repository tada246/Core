import { useAtom } from 'jotai';
import { user as user_atom } from '../../store/jotai';
import { IoPencil, IoPeople } from 'react-icons/io5';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User as NextUIUser,
    Chip,
    Button,
    Tooltip,
    useDisclosure,
    Select,
    SelectItem,
} from '@nextui-org/react';
import useAdminUsers from '../../hooks/useAdminUsers';
import dayjs from 'dayjs';
import { authority } from '../../store/authority';
import Head from '../../components/ui/Head';
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../features/firebase';
import toast from 'react-hot-toast';
import EditorModal from '../../components/ui/EditorModal';
import { userCanUploadImages } from '../../features/getAuthority';

export default function Page() {
    return (
        <div>
            <Head
                icon={<IoPeople size={24} />}
                title='管理者'
                subtitle='このアプリを使っている人の権限操作'
            />
            <div className='mt-10'>
                <Content />
            </div>
        </div>
    );
}

function Content() {
    const [user] = useAtom(user_atom);

    if (!user || !user.data) return;

    if (user.data.authority !== 'ADMIN') {
        return <p>このページにアクセスする権限がありません。</p>;
    }

    return <UserTable uid={user.uid} />;
}

type UserTableProps = {
    uid: string;
};

function UserTable(props: UserTableProps) {
    const { data, error, isLoading, mutate } = useAdminUsers();

    if (error) return <div>Error</div>;
    if (!data || isLoading) return <div>Loading...</div>;

    const admin_users = data.filter((v) => v.id !== props.uid);

    if (admin_users.length === 0) {
        return <p>ユーザーはいません。</p>;
    }

    function handleUpdateUserAuthority(uid: string, authority: string) {
        mutate((prev) => {
            if (!prev) return [];

            return prev.map((v) => {
                if (v.id === uid) {
                    return {
                        ...v,
                        authority: authority,
                    };
                }
                return v;
            });
        });
    }

    console.log(
        ['ADMIN', 'EDITOR'].includes(
            authority.filter((v) => v.id === admin_users[3]?.authority)[0].id
        ) && userCanUploadImages(admin_users[3].mail),
        admin_users[3]
    );

    return (
        <Table aria-label='ユーザー一覧'>
            <TableHeader>
                <TableColumn>名前</TableColumn>
                <TableColumn>権限</TableColumn>
                <TableColumn>作成時</TableColumn>
                <TableColumn>アクション</TableColumn>
            </TableHeader>
            <TableBody>
                {admin_users.map((user) => {
                    // これじゃないとエラーが出る
                    const userOwnAuthority = authority.filter(
                        (v) => v.id === user.authority
                    )[0];
                    const userCanUpload =
                        userCanUploadImages(user.mail) &&
                        ['ADMIN', 'EDITOR'].includes(userOwnAuthority.id);

                    return (
                        <TableRow key={user.id}>
                            <TableCell>
                                <NextUIUser
                                    name={user.name}
                                    description={user.mail}
                                    avatarProps={{
                                        src: user.photoURL,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <div className='flex gap-0 items-center divide-x-1'>
                                    <Tooltip
                                        content={userOwnAuthority.description}
                                    >
                                        <Chip
                                            variant='flat'
                                            startContent={userOwnAuthority.icon}
                                            size='sm'
                                            className='pl-2 gap-1 rounded-r-none'
                                            color={
                                                userOwnAuthority.color ??
                                                'default'
                                            }
                                        >
                                            {userOwnAuthority.name ?? '不明'}
                                        </Chip>
                                    </Tooltip>
                                    <Tooltip
                                        content={
                                            '画像のアップロードが可能かどうか'
                                        }
                                    >
                                        <Chip
                                            size='sm'
                                            variant='flat'
                                            color={
                                                userCanUpload
                                                    ? 'secondary'
                                                    : 'default'
                                            }
                                            className='pr-2 rounded-l-none'
                                        >
                                            {userCanUpload
                                                ? 'アップ可能'
                                                : 'アップ不可'}
                                        </Chip>
                                    </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell>
                                <p>
                                    {dayjs(
                                        user.timestamp.seconds * 1000
                                    ).format('YYYY/MM/DD')}
                                </p>
                                <p className='text-tiny text-default-600'>
                                    {dayjs(
                                        user.timestamp.seconds * 1000
                                    ).format('HH:mm:ss')}
                                </p>
                            </TableCell>
                            <TableCell>
                                <EditUserAuthority
                                    id={user.id}
                                    authority={user.authority}
                                    mutate={handleUpdateUserAuthority}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

type UserProps = {
    id: string;
    authority: string;
    mutate: (uid: string, authority: string) => void;
};

type EditUserAuthorityForm = {
    authority: string;
};

function EditUserAuthority(props: UserProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit } = useForm<EditUserAuthorityForm>();

    const update = async (form_data: EditUserAuthorityForm) => {
        await updateDoc(doc(db, 'admin_users', props.id), {
            authority: form_data.authority,
        });
        props.mutate(props.id, form_data.authority);
    };

    const onSubmit = (data: EditUserAuthorityForm) => {
        update(data)
            .then(() => {
                onOpenChange();
                toast.success('更新に成功');
            })
            .catch((_) => {
                toast.error('更新に失敗');
            });
    };

    return (
        <>
            <Tooltip content='権限の編集'>
                <Button variant='light' isIconOnly size='sm' onClick={onOpen}>
                    <IoPencil />
                </Button>
            </Tooltip>
            <EditorModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title='ユーザーの権限の変更'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Select
                    label='新しい権限'
                    defaultSelectedKeys={[props.authority]}
                    isRequired
                    fullWidth
                    {...register('authority')}
                >
                    {authority.map((animal) => (
                        <SelectItem
                            key={animal.id}
                            value={animal.id}
                            startContent={animal.icon}
                        >
                            {animal.name}
                        </SelectItem>
                    ))}
                </Select>
            </EditorModal>
        </>
    );
}
