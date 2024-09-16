import { Chip, Tooltip } from '@nextui-org/react';
import { Place } from '../../../types/firebase';

type Props = {
    mapImageURL: string;
    places: Place[];
};

export default function EditorMap(props: Props) {
    return (
        <div className='p-4 bg-white rounded-large border-1 border-default-200'>
            <div className='w-full overflow-hidden relative'>
                <img src={props.mapImageURL} alt='' className='w-full' />
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
                    {props.places.map((place) => (
                        <Tooltip
                            content={
                                <div className='p-2'>
                                    <p className='font-medium'>{place.name}</p>
                                    <div className='flex gap-2 mt-1'>
                                        <Chip size='sm' variant='flat'>
                                            X: {place.location.x}
                                        </Chip>
                                        <Chip size='sm' variant='flat'>
                                            Y: {place.location.y}
                                        </Chip>
                                    </div>
                                </div>
                            }
                            key={place.id}
                        >
                            <button
                                className='w-2 h-2 absolute bg-primary rounded-full -translate-x-1/2 -translate-y-1/2'
                                style={{
                                    left: `${place.location.x}%`,
                                    top: `${place.location.y}%`,
                                }}
                            />
                        </Tooltip>
                    ))}
                </div>
            </div>
        </div>
    );
}
