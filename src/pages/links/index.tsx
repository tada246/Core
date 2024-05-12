import { IoLink } from 'react-icons/io5';
import Head from '../../components/ui/Head';

const links: {
    title: string;
    subTitle: string;
    content: {
        name: string;
        link: string;
    }[];
}[] = [
    {
        title: '公開リンク',
        subTitle: '現在公開しているサイト・アプリのリンク一覧',
        content: [
            {
                name: 'プロジェクトウェブサイト',
                link: 'https://toko-tane.net/',
            },
            {
                name: 'TANE Map',
                link: 'https://map.toko-tane.net/',
            },
            {
                name: 'TANE Core',
                link: 'https://core.toko-tane.net/',
            },
        ],
    },
    {
        title: 'ドライブ',
        subTitle: 'Googleドライブ内のファイルへのリンク',
        content: [
            {
                name: 'ルートフォルダ',
                link: 'https://drive.google.com/drive/folders/1or5eg7FhQ7_v8C7Hxox_Jp13a9Pw28gj?usp=sharing',
            },
            {
                name: 'プロジェクトウェブサイト',
                link: 'https://drive.google.com/drive/folders/1PsyQ9cXoXSn9Tmo4JTTWY6MiRrNWbefh?usp=drive_link',
            },
            {
                name: 'TANE Map',
                link: 'https://drive.google.com/drive/folders/1CKO2ZuvKTt71XrHPDXBi41Uq5TgBg1e8?usp=sharing',
            },
            {
                name: 'TANE Core',
                link: 'https://drive.google.com/drive/folders/1P0lWmLLRdOWnMs_z2G5Rj5U_iDLEkDIU?usp=drive_link',
            },
            {
                name: '輝緑祭公式ウェブサイト',
                link: 'https://drive.google.com/drive/folders/1-3Zmv8GysAyP56T0ljqLesiz6O8BCnfZ?usp=drive_link',
            },
        ],
    },
    {
        title: '資料',
        subTitle: 'プロジェクトに関する資料へのリンク',
        content: [
            {
                name: 'オープンスクール 企画書',
                link: 'https://docs.google.com/document/d/1cCeTHCW9fWmgGft5hfQWtBsKSwTwEIeTNRbCWLmvT04/edit?usp=drive_link',
            },
            {
                name: '料金シュミレーター',
                link: 'https://docs.google.com/spreadsheets/d/1wxLv-KM4bbDHPZ9AzZzl9bUPDcP6VHuJq7N7W_EUKpc/edit?usp=sharing',
            },
            {
                name: '不明なことがあったときには',
                link: 'https://docs.google.com/document/d/10PKsq6bjw2uEpXYS31IDKk00JLMcAt5crQwN1Hraxpc/edit?usp=drive_link',
            },
            {
                name: '安全性',
                link: 'https://docs.google.com/document/d/1NPhWmXyaWhcr5WHlK-esIooew4kEBmdpOLBXQDr3_C8/edit?usp=drive_link',
            },
            {
                name: 'Mapの説明資料',
                link: 'https://docs.google.com/document/d/1DAWf3LfkrNV8fOTz_Cge22gE_HvUTwGwwwdcn-5cSls/edit?usp=drive_link',
            },
            {
                name: 'Coreの説明資料',
                link: 'https://docs.google.com/document/d/1dPDTZ3W0Uc6ARrzgee3uBdWXN4ZepDEtk75_7njFf94/edit?usp=drive_link',
            },
        ],
    },
];

export default function Page() {
    return (
        <div>
            <Head
                title='関連リンク'
                subtitle='プロジェクトに関係するリンクをまとめています。'
                icon={<IoLink size={24} />}
            />
            <div className='mt-10 flex flex-col gap-6'>
                {links.map((link, index) => (
                    <div
                        key={index}
                        className='p-6 shadow-medium rounded-small'
                    >
                        <h2 className='text-xl font-bold'>{link.title}</h2>
                        <p className='text-sm text-default-600'>
                            {link.subTitle}
                        </p>
                        <div className='mt-4 flex flex-col gap-4'>
                            {link.content.map((content, index) => (
                                <a
                                    key={index}
                                    href={content.link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='p-4 text-inherit rounded-medium shadow-medium flex items-center gap-2 hover:bg-primary-50 hover:shadow-large duration-300'
                                >
                                    <IoLink />
                                    <p className='flex-1'>{content.name}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
