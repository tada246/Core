import { IoAnalyticsOutline } from 'react-icons/io5';
import Head from '../../components/ui/Head';

export default function Page() {
    return (
        <div>
            <Head
                title='アナリティクス'
                subtitle='本プロジェクト内の集計データを表示'
                icon={<IoAnalyticsOutline size={24} />}
            />
            <div className='mt-10'>
                <p>データがありません</p>
            </div>
        </div>
    );
}
