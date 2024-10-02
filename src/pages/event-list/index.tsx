import { IoMapOutline } from 'react-icons/io5';
import useEventList from '../../hooks/useEventList';
import { Event } from '../../types/firebase';
import Head from '../../components/ui/Head';
import OnlyAdmin from '../../components/ui/OnlyAdmin';
import AddNewEvent from './form';
import EventCard from './card';

// 🦊
export default function Page() {
    const { data, isLoading, error, mutate } = useEventList();

    function addSWRegistration(event: Event) {
        if (!data) return;

        mutate([...data, event]);
    }

    return (
        <div>
            <Head
                icon={<IoMapOutline size={24} />}
                title='マップイベント'
                subtitle='TANE Mapでのマップイベントを編集できます。'
            />
            <div className='mt-10'>
                <div>
                    <p className='text-xl font-bold'>行事を選択</p>
                    <p className='text-sm opacity-80'>
                        各行事のマップをするためには、行事を選択してください。
                    </p>
                </div>
                {isLoading && <p className='mt-8 text-center'>ロード中...</p>}
                {error && (
                    <p className='mt-8 text-center'>エラーが発生しました。</p>
                )}
                {data && (
                    <>
                        <OnlyAdmin>
                            <AddNewEvent
                                addSWRegistration={addSWRegistration}
                            />
                        </OnlyAdmin>
                        <div className='mt-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            {data?.map((d) => (
                                <EventCard key={d.id} event={d} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
