import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Place } from '../../../types/firebase';

type Props = {
    imageURL: string;
    places: Place[];
};

export default function PreviewMap(props: Props) {
    return (
        <div className='w-full aspect-square rounded-large overflow-hidden border-1 border-default-200'>
            <TransformWrapper initialScale={1.5} centerOnInit>
                {() => (
                    <TransformComponent>
                        <div className='w-full h-[100svh] flex items-center'>
                            <div className='relative w-[1024px] h-[1024px]'>
                                <img
                                    src={props.imageURL}
                                    alt='map'
                                    width={1024}
                                    height={1024}
                                    className='w-[1024px] h-[1024px]'
                                />
                                <div className='w-full h-full absolute top-0 left-0'>
                                    {props.places.map((place, index) => (
                                        <button
                                            key={index}
                                            className={`md:w-3 md:h-3 w-2 h-2 absolute bg-primary/50 rounded-full -translate-x-1/2 -translate-y-1/2`}
                                            style={{
                                                top: `${place.location.y}%`,
                                                left: `${place.location.x}%`,
                                            }}
                                        >
                                            <p className='md:text-[0.75rem] text-[0.5rem] whitespace-nowrap -translate-x-1/2 md:translate-y-4 translate-y-2 absolute left-1/2'>
                                                {place.name}
                                            </p>
                                            <div className='absolute left-1/2 -translate-x-1/2 -translate-y-16 w-16 h-16 block'>
                                                <img
                                                    src={place.imageURL}
                                                    alt=''
                                                    width='auto'
                                                    height='auto'
                                                    className='w-16 h-16 rounded-full border-2 border-primary/50 object-cover'
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TransformComponent>
                )}
            </TransformWrapper>
        </div>
    );
}
