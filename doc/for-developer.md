# TANE Core 開発者ドキュメント

<!-- 最終更新日：2025年4月20日 -->

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [技術スタック](#技術スタック)
3. [開発環境のセットアップ](#開発環境のセットアップ)
4. [プロジェクト構成](#プロジェクト構成)
5. [主要コンポーネント](#主要コンポーネント)
6. [データモデル](#データモデル)
7. [認証と権限](#認証と権限)
8. [Firebase 連携](#firebase連携)
9. [画像処理](#画像処理)
10. [UI コンポーネント](#uiコンポーネント)
11. [ビルドとデプロイ](#ビルドとデプロイ)
12. [トラブルシューティング](#トラブルシューティング)
13. [コード規約](#コード規約)

## プロジェクト概要

TANE Core は、桐光学園の文化祭などのイベントで使用するデジタルマップアプリ「TANE Map」のコンテンツを編集・管理するための管理ツールです。マップイベントの作成、場所の登録、スタンプラリーの設定など、TANE Map で必要となる情報を編集する機能を提供します。

### 主な機能

-   マップイベント（文化祭など）の作成・編集
-   イベント内の場所や階層の管理
-   地図上の位置情報の編集
-   スタンプラリー機能の管理
-   画像のアップロードと管理
-   お知らせの投稿・管理

## 技術スタック

TANE Core は以下の技術を使用して開発されています：

-   **フロントエンド**

    -   React
    -   TypeScript
    -   TailwindCSS
    -   NextUI（UI コンポーネント）
    -   Jotai（状態管理）
    -   React Hook Form（フォーム管理）
    -   SWR（データフェッチング）
    -   Framer Motion（アニメーション）

-   **バックエンド/インフラ**

    -   Firebase Authentication（認証）
    -   Cloud Firestore（データベース）
    -   Firebase Storage（画像ストレージ）
    -   Firebase Hosting（ホスティング）

-   **ビルド/開発ツール**
    -   Vite
    -   ESLint
    -   PostCSS
    -   Autoprefixer

## 開発環境のセットアップ

### 前提条件

-   Node.js v20.9.0 以上
-   npm（Node.js にバンドルされています）

### インストール手順

1. リポジトリをクローンします

    ```bash
    git clone [リポジトリURL]
    cd tane-project/core
    ```

2. 依存パッケージをインストールします

    ```bash
    npm install
    ```

3. 環境変数を設定します
   以下の内容で`.env`ファイルをプロジェクトルートに作成します：

    ```
    VITE_API_KEY=<Firebase API Key>
    VITE_AUTH_DOMAIN=<Firebase Auth Domain>
    VITE_PROJECT_ID=<Firebase Project ID>
    VITE_STORAGE_BUCKET=<Firebase Storage Bucket>
    VITE_MESSAGING_SENDER_ID=<Firebase Messaging Sender ID>
    VITE_APP_ID=<Firebase App ID>
    VITE_MEASUREMENT_ID=<Firebase Measurement ID>
    VITE_RECAPTCHA_SITE_KEY=<reCAPTCHA Site Key>
    ```

    Firebase Console の[プロジェクト設定](https://console.firebase.google.com/project/tane-project/settings/general/web:YjM2ZDQwY2QtZTIwNy00MTliLTg4YWEtYTIzYjkxYjViN2Fm)から必要な情報を取得できます。

### 開発サーバーの起動

```bash
npm run dev
```

開発サーバーは通常 `http://localhost:5173` で起動します。

## プロジェクト構成

プロジェクトは以下のような構成になっています：

```
core/
├── dev-dist/           # PWA関連の開発時生成ファイル
├── doc/                # ドキュメント
├── public/             # 静的ファイル
└── src/                # ソースコード
    ├── assets/         # アセット（画像など）
    ├── components/     # UIコンポーネント
    │   ├── atom/       # 最小単位のコンポーネント
    │   ├── base/       # 基本的なレイアウトコンポーネント
    │   └── ui/         # 複合的なUIコンポーネント
    ├── features/       # 機能モジュール
    ├── hooks/          # カスタムReactフック
    ├── pages/          # ページコンポーネント
    ├── router/         # ルーティング関連
    ├── store/          # 状態管理（Jotai）
    └── types/          # 型定義
```

## 主要コンポーネント

### ページ構成

-   `src/pages/home/index.tsx` - ホーム画面
-   `src/pages/event/` - イベント管理
-   `src/pages/floors/` - 階層/フロア管理
-   `src/pages/stampRally/` - スタンプラリー管理
-   `src/pages/upload/` - 画像アップロード
-   `src/pages/images/` - 画像一覧
-   `src/pages/account/` - アカウント管理
-   `src/pages/manage/` - ユーザー管理（管理者用）

### 共通コンポーネント

-   `src/components/base/SideBar.tsx` - サイドナビゲーション
-   `src/components/ui/EditorModal.tsx` - 編集モーダル
-   `src/components/ui/Head.tsx` - ページヘッダー
-   `src/components/atom/Markdown.tsx` - マークダウンレンダリング

## データモデル

主要なデータモデルは `src/types/firebase.d.ts` で定義されています。以下は主要なモデルです：

### イベント (Event)

```typescript
interface Event {
    id: string;
    name: string;
    overview: string;
    isPublic: boolean;
    webURL: string;
    headerImageURL: string;
    mapImageURL: string;
    date: {
        start: Timestamp;
        end: Timestamp;
    };
    place: {
        name: string;
        location: {
            latitude: number;
            longitude: number;
        };
    };
    stampRally: {
        isEnabled: boolean;
    };
}
```

### フロア/階層 (Floor)

```typescript
interface Floor {
    id: string;
    name: string;
    order: number;
    mapImageURL: string;
}
```

### 催し物 (Entertainment)

```typescript
interface Entertainment {
    id: string;
    name: string;
    overview: string;
    description: string;
    imageURL: string;
    time: {
        start: Timestamp;
        end: Timestamp;
    };
    place: string;
}
```

### スタンプラリー (StampRally)

```typescript
interface StampRally {
    id: string;
    name: string;
    hint: string;
    order: number;
    imageURL: string;
}
```

## 認証と権限

アプリケーションは、Firebase Authentication を使用して認証を行います。認証フローは以下の通りです：

1. ユーザーが Google アカウントでログイン
2. `@toko.ed.jp`ドメインのメールアドレスを持つユーザーのみアクセスが許可される
3. 初回ログイン時に CloudFirestore 内の`admin_users`コレクションにユーザー情報が保存される
4. 初回ログイン時はデフォルトで`READER`権限が付与される

権限は以下の階層で管理されています：

| 権限   | 説明                       |
| ------ | -------------------------- |
| BANNED | アクセス制限されたユーザー |
| READER | 閲覧のみ可能               |
| EDITOR | コンテンツ編集が可能       |
| ADMIN  | すべての機能にアクセス可能 |

権限チェックは `src/components/ui/OnlyEditors.tsx` および `src/components/ui/OnlyAdmin.tsx` コンポーネントで行われています。

## Firebase 連携

Firebase 連携は `src/features/firebase.ts` で設定されています。

```typescript
// Firebase初期化の例
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
```

### データベース構造

Firestore データベースは以下の構造で設計されています：

-   **events** - イベント情報

    -   **{eventId}** - 各イベントのドキュメント
        -   **places** - イベント内の場所
            -   **{placeId}** - 各場所のドキュメント
                -   **floor** - 場所内の階層
                    -   **{floorId}** - 各階層のドキュメント
                        -   **entertainment** - 階層内の催し物
        -   **stampRally** - スタンプラリー情報
            -   **{stampRallyId}** - 各スタンプのドキュメント
                -   **secret** - QR コード用シークレット ID

-   **images** - アップロードされた画像の情報
-   **admin_users** - 管理ユーザー情報
-   **notices** - お知らせ情報

## 画像処理

画像のアップロードと圧縮には、クライアントサイド処理を採用しています。主な制約と設定は以下の通りです：

-   圧縮最大サイズ: 約 80KB (`maxSizeMB: 0.08`)
-   最大幅/高さ: 1920px (`maxWidthOrHeight: 1920`)
-   Web ワーカー使用: 有効 (`useWebWorker: true`)

アップロード権限は、以下の条件を満たすユーザーに限定されています：

-   権限が「EDITOR」または「ADMIN」であること
-   メールアドレスが`@toko.ed.jp`で終わること

## UI コンポーネント

UI は NextUI を基盤としており、TailwindCSS でスタイリングされています。主要な UI パターンは以下の通りです：

### モーダルダイアログ

```tsx
// モーダルダイアログの例
import { useDisclosure } from '@nextui-org/react';
import EditorModal from '../components/ui/EditorModal';

function SomeComponent() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>編集</Button>
            <EditorModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title='編集'
                onSubmit={handleSubmit}
            >
                {/* フォーム要素 */}
            </EditorModal>
        </>
    );
}
```

### マークダウンプレビュー

```tsx
// マークダウンプレビューの例
import PreviewMarkDownModal from '../components/ui/PreviewMarkDownModal';

function SomeComponent() {
    return <PreviewMarkDownModal content={markdownContent} />;
}
```

## ビルドとデプロイ

### ビルド

```bash
npm run build
```

ビルド成果物は `dist/` ディレクトリに生成されます。

### デプロイ

Firebase Hosting を使用したデプロイ：

```bash
firebase deploy --only hosting
```

または、Hosting とデータベースルールを含めたデプロイ：

```bash
firebase deploy --only hosting,firestore:rules
```

## トラブルシューティング

### 一般的な開発上の問題

1. **環境変数の問題**

    - `.env`ファイルが正しく設定されているか確認
    - 環境変数の名前が`VITE_`で始まっているか確認（Vite の仕様）

2. **Firebase 接続エラー**

    - Firebase コンソールでプロジェクトの設定が正しいか確認
    - Firebase ルールが適切に設定されているか確認

3. **ビルドエラー**
    - `node_modules`を削除して`npm install`を再実行
    - TypeScript のエラーを修正

### データベースアクセスの問題

1. **権限エラー**

    - Firestore ルールを確認
    - ユーザーの権限が適切か確認

2. **データ不整合**
    - Firestore コンソールでデータ構造を確認
    - 期待されるデータ型と実際のデータ型が一致しているか確認

## コード規約

### コードスタイル

-   TypeScript の厳密な型チェックを使用
-   コンポーネントはファイル名と同じ名前でエクスポート
-   React コンポーネントには関数コンポーネントと型定義を使用

```typescript
// 推奨コードスタイルの例
interface ComponentProps {
    name: string;
    // その他のプロパティ
}

export default function Component(props: ComponentProps) {
    // コンポーネントの実装
    return (
        // JSX
    );
}
```

### ファイル命名規則

-   コンポーネント: PascalCase（例: `EditorModal.tsx`）
-   ユーティリティ/フック: camelCase（例: `useWindowSize.ts`）
-   ページコンポーネント: `index.tsx` または機能名.tsx（例: `pages/event/index.tsx`）

### 状態管理

-   ローカル状態には React の useState を使用
-   グローバル状態には Jotai を使用
-   サーバー状態の取得には SWR を使用

### エラーハンドリング

-   try/catch ブロックを使用したエラーハンドリング
-   toast 通知を使用してユーザーにフィードバック

```typescript
// エラーハンドリングの例
try {
    await updateDoc(doc(db, 'events', eventId), updateData);
    toast.success('更新に成功');
} catch (error) {
    console.error('Error updating document:', error);
    toast.error('更新に失敗');
}
```

---

このドキュメントは継続的に更新されます。不明な点や追加情報がある場合は、開発チームにお問い合わせください。
