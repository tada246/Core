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
                    <Image src='https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/documents%2F%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E6%A7%8B%E6%88%902.png?alt=media&token=30d00470-776b-4397-a2b3-d5cc54203743' />
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
