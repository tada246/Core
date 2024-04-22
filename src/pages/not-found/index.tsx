import { Image } from '@nextui-org/react';

export default function NotFound() {
    return (
        <div>
            <div className='flex justify-center'>
                <Image
                    src='https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/documents%2FWeary%20Cat.png?alt=media&token=51f83115-2b5a-463f-ab0a-75aa3e3f7d74'
                    alt=''
                    width={300}
                    height={300}
                    data-size='auto'
                />
            </div>
            <h1 className='text-center text-5xl font-extrabold'>
                404 Not Found
            </h1>
            <p className='text-center mt-1'>残念でした。</p>
        </div>
    );
}
