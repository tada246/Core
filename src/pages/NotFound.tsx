import { Button } from '@nextui-org/react';
import { IoSadOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='max-w-4xl mx-auto w-full py-12 px-6'>
            <div>
                <div className='flex items-center gap-4'>
                    <IoSadOutline size={24} />
                    <p className='text-3xl font-bold'>404 Not Found</p>
                </div>
                <p className='text-sm mt-1 opacity-80'>
                    お探しのページは見つかりませんでした。
                </p>
            </div>
            <div className='mt-10'>
                <div>
                    <p className='text-xl font-bold'>ホームに戻る</p>
                    <p className='text-sm opacity-80'>ホームに戻ります</p>
                </div>
                <div>
                    <Button as={Link} to='/'>
                        戻る
                    </Button>
                </div>
            </div>
            <div className='mt-10'>
                <div>
                    <p className='text-xl font-bold'>
                        なぜ見つからなかったのか
                    </p>
                    <p className='text-sm opacity-80'>
                        このページが見つからなかった原因
                    </p>
                </div>
                <div className='mt-4'>
                    <p>
                        404 Not Found
                        エラーは、ウェブページやリソースがサーバー上で見つからないときに発生するエラーです。このエラーが表示される原因はいくつか考えられます。以下にいくつかの一般的な原因を説明します。
                    </p>
                    <ol className='list-decimal ml-7 mt-8 flex flex-col gap-4'>
                        <li>
                            ページが存在しない
                            <br />
                            このエラーの最も一般的な原因は、リクエストされたページやリソースがサーバー上に存在しない場合です。ファイル名やパスに誤りがあるか、ファイルが削除された可能性があります。
                        </li>
                        <li>
                            ファイル名またはパスの誤り
                            <br />
                            リクエストされたURLに誤りがある場合、サーバーは該当のページを見つけることができず、404エラーを返します。URLを再度確認し、スペルミスやパスの誤りがないことを確認してください。
                        </li>
                        <li>
                            ページが移動または削除された
                            <br />
                            ウェブサイトの管理者がページを別の場所に移動したり、削除したりした場合、リンクが古いままであれば404エラーが発生します。最新のリンク情報を取得してください。
                        </li>
                        <li>
                            パーミッションの問題
                            <br />
                            ウェブサーバーがリソースにアクセス権を持っていない場合、404エラーが発生します。ファイルやディレクトリのアクセス許可を確認し、修正が必要な場合は設定を変更してください。
                        </li>
                        <li>
                            サーバーエラー
                            <br />
                            サーバー自体に問題がある場合、リクエストされたページを提供できないことがあります。この場合、サーバーの状態を確認し、必要に応じて修正を行ってください。
                        </li>
                        <li>
                            リダイレクトループ
                            <br />
                            ページがリダイレクトのループに入っている場合、ブラウザは最終的に404エラーを表示します。リダイレクト構成を確認し、適切に設定してください。
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
