import { IoHelpOutline } from 'react-icons/io5';
import Head from '../../components/ui/Head';
import SubHead from '../../components/ui/SubHead';

export default function Help() {
    const presentationUrl = `https://docs.google.com/presentation/d/e/2PACX-1vSdQJmBX1ZgO3iLeUzHUVcAiLeDZ1215CDT2bjTdV2k7-yxsh8S5o1jnuJJvJ_N8DuZxE-Hp4yCxqVT/embed?start=false&loop=false&delayms=3000`;

    return (
        <div>
            <Head
                icon={<IoHelpOutline size={24} />}
                title='ヘルプ'
                subtitle='このアプリの使い方を紹介します'
            />
            <SubHead
                title='使い方'
                subtitle='このアプリの使い方を紹介します'
                className='mt-10'
            >
                <iframe
                    src={presentationUrl}
                    width='960'
                    height='569'
                    className='w-full mt-4'
                />
            </SubHead>
        </div>
    );
}
