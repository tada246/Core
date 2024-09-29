import { IoDuplicate } from 'react-icons/io5';
import Head from '../../components/ui/Head';
import SubHead from '../../components/ui/SubHead';
import UploadDescription from './description';
import RecommendedUpload from './recommended';
import Upload from './upload';
import ImageCompressor from './compression';

export default function Page() {
    return (
        <div>
            <Head
                title='アップロード'
                subtitle='TANE Coreで利用する素材をアップロードします'
                icon={<IoDuplicate size={24} />}
            />
            <SubHead
                title='ファイルをアップロード'
                subtitle='ドラッグアンドドロップ又は選択してアップロードをすることができます。最大4枚までアップロードできます。'
                className='mt-10'
            >
                <Upload />
            </SubHead>
            <SubHead
                title='ファイルを圧縮'
                subtitle='アップロードできるぎりぎりのサイズに圧縮を行うことができます。'
                className='mt-10'
            >
                <ImageCompressor />
            </SubHead>
            <SubHead
                title='アップロードの制限'
                subtitle='ファイルアップロード時に制限されるファイルの種類やサイズを確認が可能'
                className='mt-10'
            >
                <UploadDescription />
            </SubHead>
            <SubHead
                title='推奨する画像設定'
                subtitle='画像のアップロード時に推奨する設定を確認が可能'
                className='mt-10'
            >
                <RecommendedUpload />
            </SubHead>
        </div>
    );
}
