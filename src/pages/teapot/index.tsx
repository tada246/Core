import { Image } from '@nextui-org/react';

export default function Page() {
    return (
        <div className='fixed top-0 left-0 w-full h-[100svh] bg-white/20 backdrop-blur-md flex justify-center items-center'>
            <Image
                src="https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/documents%2F418%20I'm%20a%20teapot.webp?alt=media&token=4ad61efc-91b8-46fc-9679-3e11c52636fd"
                width={960}
                height={540}
                alt="418 I'm a teapot"
                isBlurred
            />
        </div>
    );
}
