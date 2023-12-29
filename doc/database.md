TANE Core のデータベースについてちょっと書きます。
というか、キャッシュするのめんどくさい
どこで Core のキャッシュするか検討しているが、後で決める

# Information

| 種類                | 名前            | 詳細                                                                                                   |
| ------------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| サービース          | Cloud Firestore | *Firestore*  は、NoSQL のサーバレスデータベース です。ドキュメント指向のデータモデルを採用しています。 |
| データベース タイプ | NoSQL           | なんとなく                                                                                             |
| データベース場所    | asia northeast1 | 多分東京に置いた気がする                                                                               |

# データ

## 学校行事

-   コレクション：events
-   ID：手動設定

```json
{
    "id": "string<ID>",
    "name": "string<名前>",
    "overview": "string<イベントについての一言>",
    "link": "string(url)<イベントの詳細リンク>",
    "isPublic": "string<公開するかどうか（完全に非公開にはできない）>",
    "explanation": "string<イベントの説明>",
    "imageURL": "string<画像のURL>",
    "date": {
        "start": "Firebase Timestamp<イベントの開催時刻>",
        "end": "Firebase Timestamp<イベントの終了時刻>"
    },
    "mapURL": ""
}
```

### サブ：places

```json
{
    "id": "string<ID>",
    "name": "string<名前>",
    "imageURL": "string(url)<場所の画像の名前>",
    "location": {
        "x": "number<x座標>",
        "y": "number<y座標>"
    }
}
```

### places サブ：floor

```

```

### サブ：forms

-   ID：自動

```json
{
    "id": "string<ID>",
    "timestamp": "Firebase Timestamp<タイムスタンプ>",
    "name": "string<フォームの名前>",
    "order": "number<何番目に表示するか（重複可能・ASC）>",
    "url": "string(url)<フォールのURL>",
    "content": "string<フォームに関しての具体的な説明やお願い>"
}
```

## リアルタイムお知らせ

-   コレクション：notices
-   ID：自動

```json
{
    "id": "string<ID>",
    "timestamp": "Firebase Timestamp<タイムスタンプ>",
    "title": "string<お知らせのタイトル>",
    "type": "enum(normal|emergency|promotion)<お知らせのタイプ>",
    "writer": ["string<ライター>"],
    "content": "string<コンテンツ>"
}
```

## 管理ユーザー

-   コレクション：admin_users
-   ID：自動？

```json
{
    "id": "string<ID>",
    "timestamp": "Firebase Timestamp<タイムスタンプ>",
    "name": "string<名前>",
    "mail": "string(e-mail)<イーメイル>",
    "authority": "enum()<>",
    "iconURL": "string(url)<アイコンの画像URL>"
}
```
