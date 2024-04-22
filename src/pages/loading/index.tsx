import { DNA } from 'react-loader-spinner';
import { motion } from 'framer-motion';

export default function Page() {
    return (
        <div className='w-full h-[100svh] flex justify-center items-center'>
            <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ ease: 'easeIn', duration: 1 }}
            >
                <DNA
                    visible={true}
                    height='120'
                    width='120'
                    ariaLabel='puff-loading'
                    wrapperStyle={{}}
                    wrapperClass=''
                />
            </motion.div>
        </div>
    );
}
