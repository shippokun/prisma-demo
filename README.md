# 概要

[prisma](https://www.prisma.io/)を使って backend の触りをやってみようリポジトリ

## インストール

```shell
npm ci
```

## はじめにやること

- mysql のインストール

```shell
brew install mysql@5.7
echo 'export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

- mysql の起動

```shell
brew services start mysql@5.7 # mysql起動
mysql_secure_installation # user, passの設定
mysql --user=root --password # ログイン
brew services stop mysql@5.7 # mysql停止
```

- 最初の一歩

```shell
mysql --user=root --password # ログイン
```

```sql
SHOW databases; # 一覧の確認
CREATE DATABASE mydb; # db作成
USE mydb; # 使用するデータベースの指定
CREATE TABLE users (id INT AUTO_INCREMENT, name TEXT, PRIMARY KEY (id)); # 適当なテーブルの作成(これはいらないかも)
```

- 最後に

```shell
touch .env
echo DATABASE_URL="mysql://root:password@127.0.0.1:3306/mydb?connection_limit=5" >> .env

prisma introspect # スキーマファイルのチェック
```

## マイグレーションについて

DB の構造を変更したいときどうすればええの？
`./schema.prisma`で model やらを編集
下記のコマンドを実行すると`/migrations`にマイグレーションファイルが生成される

```shell
prisma migrate save --experimental # マイグレーション
```

## メモ

- スキーマファイルの場所の指定は `package.json` の `prisma` で指定できる

- スキーマファイルのチェック（？）

```shell
prisma introspect
```
