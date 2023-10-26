import { IoGitBranchOutline, IoLogoCss3, IoLogoFirebase, IoLogoGithub, IoLogoHtml5, IoLogoMarkdown, IoLogoNodejs, IoLogoNpm, IoLogoPwa, IoLogoReact } from 'react-icons/io5';

export default function ForDevelopers() {
    return (
        <div className='max-w-4xl mx-auto w-full mt-12'>
            <div>
                <div className='flex items-center gap-4'>
                    <IoGitBranchOutline size={24} />
                    <p className='text-3xl font-bold'>開発者用</p>
                </div>
                <p className='text-sm mt-1 opacity-80'>
                    開発用のドキュメントが今すべてここに
                </p>
            </div>
            <div className='mt-10'>
                <div>
                    <p className='text-xl font-bold'>使われている技術</p>
                    <p className='text-sm opacity-80'>
                        このアプリに使われている技術を紹介します（アイコンがあるもののみ）
                    </p>
                </div>
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
            </div>
        </div>
    );
}
