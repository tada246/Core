import { Tooltip } from '@nextui-org/react';
import { DataType } from './props';

export default function FloorEditorMap(props: { floor: DataType }) {
    const events = props.floor.events.filter((event) => event.location);

    return (
        <div className='overflow-hidden relative outline outline-1 outline-black/10 rounded-medium'>
            <img
                src={props.floor.mapImageURL}
                alt=''
                className='w-full aspect-[3/2] object-cover object-center'
            />
            <div className='w-full h-full absolute top-0 left-0 z-10 flex justify-between'>
                <div className='w-[0.05rem] h-full bg-none' />
                {[...Array(9)].map((_, i) => (
                    <div
                        key={i}
                        className='w-[0.05rem] h-full bg-default-200'
                    />
                ))}
                <div className='w-[0.05rem] h-full bg-none' />
            </div>
            <div className='w-full h-full absolute top-0 left-0 z-10 flex flex-col justify-between'>
                <div className='w-full h-[0.05rem] bg-none' />
                {[...Array(9)].map((_, i) => (
                    <div
                        key={i}
                        className='w-full h-[0.05rem] bg-default-200'
                    />
                ))}
                <div className='w-full h-[0.05rem] bg-none' />
            </div>
            <div className='w-full h-full absolute top-0 left-0 z-20'>
                {events.map(
                    (place) =>
                        place.location && (
                            <Tooltip content={place.name} key={place.id}>
                                <button
                                    className='w-4 h-4 absolute bg-primary rounded-full -translate-x-1/2 -translate-y-1/2'
                                    style={{
                                        left: `${place.location.x}%`,
                                        top: `${place.location.y}%`,
                                    }}
                                />
                            </Tooltip>
                        )
                )}
            </div>
        </div>
    );
}
