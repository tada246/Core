import { IoLogoMarkdown } from 'react-icons/io5';
import Head from '../../components/ui/Head';

export default function Page() {
    return (
        <>
            <Head
                icon={<IoLogoMarkdown size={24} />}
                title='リアルタイム連絡'
                subtitle='TANE Mapへのお知らせの投稿を行うことができます'
            />
        </>
    );
}
