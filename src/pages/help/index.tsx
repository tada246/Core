import { IoHelpOutline } from 'react-icons/io5';
import Head from '../../components/ui/Head';
import SubHead from '../../components/ui/SubHead';

export default function Help() {
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
                <p className='mt-4'>まだ作成中です</p>
            </SubHead>
        </div>
    );
}
