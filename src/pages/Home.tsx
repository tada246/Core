import { Button, Card, CardFooter, Image } from '@nextui-org/react';
import { IoHome } from 'react-icons/io5';

export default function Home() {
    return (
        <div className='max-w-4xl mx-auto w-full py-12 px-6'>
            <div>
                <div className='flex items-center gap-4'>
                    <IoHome size={24} />
                    <p className='text-3xl font-bold'>ホーム</p>
                </div>
                <p className='text-sm mt-1 opacity-80'>TANE Coreホーム</p>
            </div>
            <div className='mt-10'>
                <div className='flex gap-4'>
                    <Card
                        isFooterBlurred
                        radius='lg'
                        className='border-none shadow-inner'
                    >
                        <Image
                            alt='Woman listing to music'
                            className='object-cover w-52 h-52'
                            height={200}
                            src='src/assets/img/armands-brants-cPEadMBTOdE-unsplash.jpg'
                            width={200}
                        />
                        <CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
                            <p className='text-tiny text-white/80'>
                                メンバー一覧
                            </p>
                            <Button
                                className='text-tiny text-white bg-black/20'
                                variant='flat'
                                color='default'
                                radius='lg'
                                size='sm'
                            >
                                見る
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card isFooterBlurred radius='lg' className='border-none'>
                        <Image
                            alt='Woman listing to music'
                            className='object-cover w-52 h-52'
                            height={200}
                            src='src/assets/img/armands-brants-cPEadMBTOdE-unsplash.jpg'
                            width={200}
                        />
                        <CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
                            <p className='text-tiny text-white/80'>
                                TANE Core ヘルプ
                            </p>
                            <Button
                                className='text-tiny text-white bg-black/20'
                                variant='flat'
                                color='default'
                                radius='lg'
                                size='sm'
                            >
                                見る
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
