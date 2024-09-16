import { useMemo } from 'react';
import { Entertainment } from '../../../types/firebase';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { DataType } from './props';

export default function FloorMapPreview({ floor }: { floor: DataType }) {
    // 同じ座標の場所をグループ化する
    const group: Map<string, Entertainment[]> = useMemo(() => {
        const map = new Map<string, Entertainment[]>();
        floor.events.forEach((event) => {
            if (!event.location) return;

            const key = `${event.location.x},${event.location.y}`;
            if (map.has(key)) {
                map.get(key)?.push(event);
            } else {
                map.set(key, [event]);
            }
        });
        return map;
    }, [floor.events]);

    return (
        <div className='outline outline-1 outline-black/10 rounded-medium bg-white relative w-full flex items-center overflow-hidden'>
            <TransformWrapper initialScale={0.8} centerOnInit>
                {() => (
                    <TransformComponent>
                        <div className='w-full aspect-[3/2] flex justify-center items-center'>
                            <div className='relative w-[720px] h-[480px]'>
                                <img
                                    src={floor.mapImageURL}
                                    alt=''
                                    className='w-[720px] h-[480px] object-cover object-center'
                                />
                                <div className='w-full h-full absolute top-0 left-0'>
                                    {/* groupを表示 */}
                                    {Array.from(group.values()).map(
                                        (places) =>
                                            places[0].location && (
                                                <div key={places[0].id}>
                                                    <div
                                                        className='p-1 absolute bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 w-3 h-3'
                                                        style={{
                                                            left: `${places[0].location.x}%`,
                                                            top: `${places[0].location.y}%`,
                                                        }}
                                                    />
                                                    <div
                                                        className='absolute -translate-x-1/2 -translate-y-10 w-10 h-10'
                                                        style={{
                                                            left: `${places[0].location.x}%`,
                                                            top: `${places[0].location.y}%`,
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                places[0]
                                                                    .imageURL
                                                            }
                                                            width={16}
                                                            height={16}
                                                            className='w-10 h-10 border-2 border-primary rounded-full bg-white shadow-medium object-cover object-center'
                                                        />
                                                    </div>
                                                    <div
                                                        className='absolute -translate-x-1/2 translate-y-2 md:text-[0.5rem] text-[0.5rem] max-w-10 line-clamp-1'
                                                        style={{
                                                            left: `${places[0].location.x}%`,
                                                            top: `${places[0].location.y}%`,
                                                        }}
                                                    >
                                                        <p>{places[0].place}</p>
                                                    </div>
                                                    <div
                                                        className='absolute -translate-x-6 -translate-y-[3.5rem] flex gap-0.5 flex-col bg-white rounded-full p-0.5'
                                                        style={{
                                                            left: `${places[0].location.x}%`,
                                                            top: `${places[0].location.y}%`,
                                                        }}
                                                    >
                                                        {places.map((p, i) => (
                                                            <div
                                                                key={i}
                                                                className='text-[0.5rem] bg-secondary text-white w-3 h-3 flex justify-center items-center rounded-full'
                                                            >
                                                                <p className='text-center'>
                                                                    {p.order}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </div>
                    </TransformComponent>
                )}
            </TransformWrapper>
        </div>
    );
}
