import { Link } from '@nextui-org/react';
import { memo } from 'react';

const UploadDescription = memo(() => {
    return (
        <ul className='list-disc ml-7 flex flex-col gap-2 mt-4'>
            <li>
                <p>png、jpg、jpeg、webp、svg のみの拡張子の画像</p>
            </li>
            <li>
                <p>
                    容量オーバーの場合は、
                    <Link
                        href='https://squoosh.app/'
                        isExternal
                        underline='hover'
                    >
                        Google製の画像圧縮・変換サービス「Squoosh」
                    </Link>
                    を使って圧縮してください。
                </p>
            </li>
            <li>
                <p>800px以下の縦横サイズにしてください。</p>
            </li>
            <li>
                <p>1つ当たり最大80KBのサイズまで可能。それ以外は、エラー。</p>
            </li>
            <li>
                <p>アップロードしたデータは削除不可</p>
            </li>
            <li>
                <p>ファイル名は削除され、ランダムなIDが付与されます。</p>
            </li>
        </ul>
    );
});

export default UploadDescription;
