export default function Page() {
    return (
        <>
            <div className='w-full h-[100svh] fixed top-0 left-0 z-40 bg-gradient-to-tr from-lime-300 to-pink-300 blur-lg' />
            <div className='w-full h-[100svh] fixed top-0 left-0 z-50 flex flex-col justify-center items-center'>
                <p className='mt-2 font-extrabold text-2xl'>
                    アクセスが禁止されています
                </p>
            </div>
        </>
    );
}
