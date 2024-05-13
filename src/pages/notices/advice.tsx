import dayjs from 'dayjs';
import WarningCard from '../../components/ui/WarningCard';

export default function NoticesAdvice() {
    const isShow = dayjs().isAfter(dayjs('2024/05/31'));

    if (isShow) {
        return;
    }

    return (
        <div className='mb-4'>
            <WarningCard
                message='リアルタイム連絡について'
                description='2024/06/01から利用できる予定です。それまでは、投稿しないでください。'
            />
        </div>
    );
}
