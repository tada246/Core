import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
    children: ReactNode;
};

export default function ShowLogo(props: Props) {
    const { children } = props;
    const [status, setStatus] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => {
            setStatus(1);
        }, 2000);

        setTimeout(() => {
            setStatus(2);
        }, 3000);
    }, []);

    if (status === 0 || status === 1) {
        return (
            <div className='w-full h-[100svh] flex justify-center items-center'>
                <AnimatePresence>
                    {status === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <svg
                                width='128'
                                height='128'
                                viewBox='0 0 128 128'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='scale-150 drop-shadow-lg'
                            >
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M69.7932 35.4209C69.9062 35.2067 70.0209 34.9973 70.1372 34.7929C69.9104 35.188 69.7932 35.4209 69.7932 35.4209ZM70.1372 34.7929C70.2377 34.6192 70.3582 34.4142 70.5003 34.1839C70.3773 34.3821 70.256 34.585 70.1372 34.7929ZM87.2447 26.0946C87.2688 26.1192 87.1251 26.1137 86.845 26.1031C84.8359 26.0267 75.7782 25.6825 70.5003 34.1839C72.4995 30.9375 78.6124 22.6546 87.2447 26.0946Z'
                                    fill='#18181B'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M70.1371 34.793C70.0208 34.9976 69.9061 35.2069 69.7931 35.4211C68.5327 35.1296 77.0644 15.6027 87.2446 26.0948C78.6124 22.6547 72.4994 30.9377 70.5002 34.1841C70.3582 34.4144 70.2377 34.6193 70.1371 34.793Z'
                                    fill='#18181B'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M40.1257 26.9859C50.306 16.4938 58.8373 36.0207 57.5769 36.3122C57.5769 36.3122 49.8728 16.9402 40.1257 26.9859Z'
                                    fill='#18181B'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M40.5254 26.9944C42.6272 26.9145 52.4448 26.5413 57.5768 36.3121C57.5768 36.3121 49.8728 16.9401 40.1256 26.9859C40.1018 27.0105 40.2448 27.005 40.5254 26.9944Z'
                                    fill='#18181B'
                                />
                                <path
                                    d='M93.3516 52.0334H85.4988L88.1909 49.0342L93.3516 52.0334Z'
                                    fill='#18181B'
                                />
                                <path
                                    d='M86.9529 44.7476L93.3517 52.0338L88.1909 49.0345L86.9529 44.7476Z'
                                    fill='#18181B'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M81.4275 44.7476L85.4989 52.0338L88.1911 49.0345L86.953 44.7476H81.4275Z'
                                    fill='#18181B'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M45.9431 45.6387L41.8711 52.9249L40.9617 50.7055L45.9431 45.6387Z'
                                    fill='#18181B'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M41.8711 52.9248H34.0181L40.9617 50.7056L41.8711 52.9248Z'
                                    fill='#18181B'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M34.0181 52.9249L40.9617 50.7055L45.9431 45.6387H40.4169L34.0181 52.9249Z'
                                    fill='#18181B'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M114.478 42.1185C95.2123 32.8027 63.6853 33.0938 72.7346 70.648C62.3384 27.5041 98.5658 26.1689 114.478 42.1185Z'
                                    fill='#18181B'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M72.7344 70.6483C77.1814 89.1018 67.1882 105.874 63.6851 105.874V46.7766C81.1997 17.956 110.742 33.5016 114.478 42.1187C98.5656 26.1691 62.3382 27.5043 72.7344 70.6483Z'
                                    fill='#18181B'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M13 42.3233C15.6253 36.2689 30.9898 26.794 45.9712 31.6906C37.8083 29.8184 29.3364 34.1053 19.269 39.1997C17.2472 40.2228 15.1609 41.2785 13 42.3233Z'
                                    fill='#18181B'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M63.7935 106C60.2905 106 50.2974 89.2281 54.7441 70.7746C63.7935 33.2204 32.2665 32.9293 13 42.2451C15.1609 41.2002 17.2472 40.1445 19.269 39.1214C29.3364 34.0271 37.8083 29.7401 45.9712 31.6123C52.3123 33.6848 58.5848 38.332 63.7935 46.9029V79.7118C63.7935 79.7118 63.7935 80.6032 63.7935 88.6231C63.7935 96.643 63.7935 99.317 63.7935 99.317V106Z'
                                    fill='#18181B'
                                />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return children;
}
