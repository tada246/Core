import { ThreeDots } from 'react-loader-spinner';
import { motion } from 'framer-motion';

export default function Page() {
    return (
        <div className='w-full h-[100svh] flex justify-center items-center fixed top-0 left-0'>
            <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ ease: 'easeIn', duration: 1 }}
            >
                <ThreeDots
                    visible={true}
                    height={40}
                    width={40}
                    color='#006FEE'
                    ariaLabel='loading'
                />
            </motion.div>
        </div>
    );
}
