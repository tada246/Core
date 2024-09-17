import { IoChevronDownOutline, IoFolderOpen } from 'react-icons/io5';
import useAllImages from '../../hooks/useAllImages';
import { Button, Spinner } from '@nextui-org/react';
import Head from '../../components/ui/Head';
import ImageCard from './card';

export default function Page() {
    const { data, isLoading, error, isLast, loadMoreImages } = useAllImages();

    return (
        <div>
            <Head
                icon={<IoFolderOpen size={24} />}
                title='画像一覧'
                subtitle='Coreで保存されている画像を一覧で表示します'
            />
            <div className='mt-10'>
                {error && <p>エラーが発生しました</p>}
                {isLoading && (
                    <div className='flex justify-center mt-8'>
                        <Spinner label='読み込み中です..' />
                    </div>
                )}
                {data && (
                    <div className='gap-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3'>
                        {data.map((image) => (
                            <ImageCard image={image} key={image.id} />
                        ))}
                    </div>
                )}
                {data && (
                    <div className='flex justify-center gap-2 mt-10'>
                        <Button
                            color='primary'
                            variant='shadow'
                            onClick={() => {
                                loadMoreImages();
                            }}
                            isDisabled={isLast}
                            startContent={<IoChevronDownOutline />}
                            fullWidth
                        >
                            もっと読み込む
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
