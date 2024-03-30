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
import { Image } from '@nextui-org/react';

export default function Page() {
    return (
        <div>
            <Head
                icon={<IoGitBranchOutline size={24} />}
                title='開発者用'
                subtitle='開発用のドキュメントが今すべてここにあるかも知れません。'
            />
            <SubHead
                title='使われている技術'
                subtitle='このアプリに使われている技術を紹介します（アイコンがあるもののみ）'
                className='mt-10'
            >
                <div className='mt-4 flex gap-4'>
                    <IoLogoReact size={28} />
                    <IoLogoFirebase size={28} />
                    <IoLogoPwa size={28} />
                    <IoLogoGithub size={28} />
                    <IoLogoHtml5 size={28} />
                    <IoLogoCss3 size={28} />
                    <IoLogoNpm size={28} />
                    <IoLogoMarkdown size={28} />
                    <IoLogoNodejs size={28} />
                </div>
            </SubHead>
            <SubHead
                title='開発者用ドキュメント'
                subtitle='開発者用のドキュメントを紹介します'
                className='mt-10'
            >
                <div className='mt-4 w-full'>
                    <Image src='https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/documents%2Fsystem-configuration.jpg?alt=media&token=d29cfa1b-c697-4f4b-9fbd-823b223aff42' />
                </div>
            </SubHead>
        </div>
    );
}
