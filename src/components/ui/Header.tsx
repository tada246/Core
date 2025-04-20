import {
    Avatar,
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
} from '@nextui-org/react';
import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';
import { IoChevronDown, IoHome, IoImage, IoPeople } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { auth } from '../../features/firebase';

export default function Header() {
    const user = getAuth().currentUser;

    const [selectedOption, setSelectedOption] = useState(new Set(['merge']));

    const descriptionsMap = {
        merge: 'All commits from the source branch are added to the destination branch via a merge commit.',
        squash: 'All commits from the source branch are added to the destination branch as a single commit.',
        rebase: 'All commits from the source branch are added to the destination branch individually.',
    };

    const labelsMap = {
        merge: 'Create a merge commit',
        squash: 'Squash and merge',
        rebase: 'Rebase and merge',
    };

    // Convert the Set to an Array and get the first value.
    const selectedOptionValue = Array.from(
        selectedOption
    )[0] as keyof typeof labelsMap;

    return (
        <div className='w-[calc(100%-3rem)] h-10 fixed top-[1.5rem] left-[1.5rem] flex justify-between'>
            <div className='flex gap-2'>
                <div className=''>
                    <Button
                        radius='full'
                        isIconOnly
                        className='bg-white dark:bg-black shadow-medium'
                    >
                        <IoHome />
                    </Button>
                </div>
                <ButtonGroup
                    radius='full'
                    className='shadow-medium rounded-full'
                >
                    <Button className='bg-white dark:bg-black'>
                        {labelsMap[selectedOptionValue]}
                    </Button>
                    <Dropdown placement='bottom' className='shadow-small'>
                        <DropdownTrigger>
                            <Button
                                isIconOnly
                                className='bg-white dark:bg-black'
                            >
                                <IoChevronDown />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label='Merge options'
                            className='max-w-[300px]'
                            selectedKeys={selectedOption}
                            selectionMode='single'
                            onSelectionChange={(selectedKeys) =>
                                setSelectedOption(selectedKeys as Set<string>)
                            }
                        >
                            <DropdownItem
                                key='merge'
                                description={descriptionsMap['merge']}
                            >
                                {labelsMap['merge']}
                            </DropdownItem>
                            <DropdownItem
                                key='squash'
                                description={descriptionsMap['squash']}
                            >
                                {labelsMap['squash']}
                            </DropdownItem>
                            <DropdownItem
                                key='rebase'
                                description={descriptionsMap['rebase']}
                            >
                                {labelsMap['rebase']}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </ButtonGroup>
            </div>
            <div className='flex gap-2'>
                <Dropdown showArrow placement='bottom-end' offset={16}>
                    <DropdownTrigger>
                        <Avatar
                            src={user?.photoURL || ''}
                            alt='User profile image'
                            radius='full'
                            as='button'
                            className='w-10 h-10 shadow-medium'
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Actions'>
                        <DropdownSection showDivider>
                            <DropdownItem key='me' className='h-14'>
                                <p className='font-bold'>
                                    {user?.displayName || ''}
                                </p>
                                <p className='text-default-600'>
                                    {user?.email || ''}
                                </p>
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection showDivider>
                            <DropdownItem
                                key='copy'
                                startContent={<IoPeople />}
                            >
                                チームの管理
                            </DropdownItem>
                            <DropdownItem key='edit' startContent={<IoImage />}>
                                画像の管理
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection>
                            <DropdownItem key='settings'>設定</DropdownItem>
                            <DropdownItem
                                key='delete'
                                className='text-danger'
                                color='danger'
                                onClick={() => signOut(auth)}
                            >
                                ログアウト
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
}
