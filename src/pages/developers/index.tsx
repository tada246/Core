import {
    IoGitBranchOutline,
    IoLogoCss3,
    IoLogoFirebase,
    IoLogoGithub,
    IoLogoHtml5,
    IoLogoMarkdown,
    IoLogoNodejs,
    IoLogoNpm,
    IoLogoPwa,
    IoLogoReact,
} from 'react-icons/io5';
import Head from '../../components/ui/Head';
import SubHead from '../../components/ui/SubHead';
import { Image, Link } from '@nextui-org/react';
import {
    SiEslint,
    SiPostcss,
    SiTailwindcss,
    SiTypescript,
} from 'react-icons/si';
import { FaAutoprefixer, FaCookie } from 'react-icons/fa';

export default function Page() {
    return (
        <div>
            <Head
                icon={<IoGitBranchOutline size={24} />}
                title='開発者用'
                subtitle='開発用の簡単なドキュメントです。'
            />
            <SubHead
                title='使われている技術'
                subtitle='このアプリに使われている技術を紹介します（アイコンがあるもののみ）'
                className='mt-10'
            >
                <div className='mt-4 flex gap-4 flex-wrap w-full'>
                    <IoLogoReact size={28} />
                    <IoLogoFirebase size={28} />
                    <IoLogoPwa size={28} />
                    <IoLogoGithub size={28} />
                    <IoLogoHtml5 size={28} />
                    <IoLogoCss3 size={28} />
                    <IoLogoNpm size={28} />
                    <IoLogoMarkdown size={28} />
                    <IoLogoNodejs size={28} />
                    <SiPostcss size={28} />
                    <FaCookie size={28} />
                    <FaAutoprefixer size={28} />
                    <SiEslint size={28} />
                    <SiTailwindcss size={28} />
                    <SiTypescript size={28} />
                </div>
            </SubHead>
            <SubHead
                title='開発者用ドキュメント'
                subtitle='開発者用のドキュメントを紹介します'
                className='mt-10'
            >
                <div className='mt-4 w-full'>
                    <Image src='https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/documents%2Fsystem-configuration-06.jpg?alt=media&token=7a9b5280-63a2-41d2-b4ea-17c64c7a3349' />
                </div>
            </SubHead>
            <SubHead
                title='スピナーについて'
                subtitle='ローディング中に表示されるスピナーについての説明です'
                className='mt-10'
            >
                <div className='mt-2'>
                    <p>
                        デオキシリボ核酸です。DNAが回っています。
                        <Link
                            href='https://mhnpd.github.io/react-loader-spinner/docs/components/dna'
                            isExternal
                            showAnchorIcon
                        >
                            URL
                        </Link>
                    </p>
                </div>
            </SubHead>
        </div>
    );
}
