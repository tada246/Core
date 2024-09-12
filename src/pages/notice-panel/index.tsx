import { IoDesktopOutline } from 'react-icons/io5';
import Head from '../../components/ui/Head';
import WarningCard from '../../components/ui/WarningCard';
import { Button } from '@nextui-org/react';

export default function Page() {
    function startFullScreen() {
        const elem = document.getElementById('message-panel');

        if (elem === null) {
            return;
        }

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    }

    if (true) {
        return (
            <div>
                <p>サポートされていません</p>
            </div>
        );
    }

    return (
        <div>
            <Head
                icon={<IoDesktopOutline size={24} />}
                title='連絡拡大表示'
                subtitle='大画面の連絡表示'
            />
            <div className='mt-10'>
                <WarningCard
                    message='注意点と説明'
                    description='これは、リアルタイム連絡を大画面で表示するための機能です。表示中は盗難に気をつけてください。'
                />
                <Button
                    color='primary'
                    fullWidth
                    className='mt-4'
                    onClick={startFullScreen}
                >
                    開始する
                </Button>
                <div className='shadow-medium rounded-medium mt-2 aspect-video'>
                    <div id='message-panel' className='w-full h-full bg-white'>
                        <p>テスト</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
