import { useParams } from 'react-router-dom';
import SmallEventInfo from '../../components/ui/SmallEventInfo';
import QRCheck from './qrCheck';
import StampRallyEditor from './editor';
import useStampRally from '../../hooks/useStampRally';
import StampRallyQRDownload from './download';

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const { data } = useStampRally(id);

    if (!data || !id) return;

    console.log(data);

    return (
        <div>
            <SmallEventInfo
                smallText='スタンプラリーの編集'
                tags={[`スタンプラリー数:${data.length}`]}
                isStampRally
            />
            <div className='mt-10 grid md:grid-cols-2 grid-cols-1 gap-6'>
                <StampRallyEditor eventId={id} stampRally={data} />
                <QRCheck eventId={id} />
                <StampRallyQRDownload eventId={id} stampRally={data} />
            </div>
        </div>
    );
}
