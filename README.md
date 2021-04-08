# 概要

[prisma](https://www.prisma.io/)を使って backend の触りをやってみようリポジトリ

## インストール

```shell
npm ci
```

## 開発

```shell
docker-compose up -d # dbの立ち上げ
npm run dev # apiの立ち上げ
```

## シード

```shell
npm run seed
```

## マイグレーションについて

DB の構造を変更したいときどうすればええの？
`./schema.prisma`で model やらを編集
下記のコマンドを実行すると`/migrations`にマイグレーションファイルが生成される

```shell
npx prisma migrate dev # マイグレーション
```
