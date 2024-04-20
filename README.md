# km-ui public

## version

node: 20.10.0  
npm: 9.1.2

## Setup

### initialize

#### vscode settings

```
{
  # ファイルを開くたびに前のタブを消さない
  "workbench.editor.enablePreview": false,

  # ダブルクリックでファイルを開く
  "workbench.list.openMode": "doubleClick",

  # タブサイズは 2 とする
  "editor.tabSize": 2,

  # 右に表示されるミニマップを表示しない
  "editor.minimap.enabled": false,

  # フォルダをまとめて階層表示しない
  "explorer.compactFolders": false,

  # 改行コードは LF で保存する
  "files.eol": "\n"
}
```

<br>

#### vscode plugin

- IntelliJ IDEA Keybindings  
   ※ InteliJ と同じ keymap にしてくれる。

<br>

#### create project

* npx create-next-app  
  ※ デフォルトで TypeScript、ESLint、および Tailwind CSS (MaterialUI を利用する場合は No で良い)、App Router (src フォルダでなく app フォルダは以下にできるよう) 構成が同梱されるようになっている。  
  ※ page.tsx の中身を空にし、public フォルダ配下の static ファイルを削除する。  
  ※ favicon.ico を public フォルダに移動する。  

<br>

* env  
  ※ デフォルトで env 利用ができる。  
  ※ SSR 都合、env にあるものはシークレット(ブラウザに返されない) である。  
  ※ もし、ブラウザに見せたいものがあれば NEXT_PUBLIC_ を先頭につければ html 上インラインに入るのでブラウザでも利用できる。  
  ※ 優先順位は「.env.local」 -> 「.env.$(NODE_ENV)」 -> 「.env」になり、各 env で変数定義した場合、優先順位が高い値が優先される。  
  ※ 上記特性から、.env.local に秘匿情報を入れ push せず、.env を開発環境用、.env.production を本番環境用として push し利用している。

<br><br>

### code

#### formatter

- npm i -D prettier  
  ※ フォーマッタを担当するが、lint は担当しない。  
  ※ prettier ignore および rc ファイルを用意  

* package json への追加  
  ※ "format": "prettier --write ./{app,server}/**/*.{ts,tsx}" を npm script に設定

```
{
  # 行数制限は 80
  "printWidth": 80,

  # タブ数は 2
  "tabWidth": 2,

  # 文字列はシングルクォートにする
  "singleQuote": true,

  # ステートメントの最後にセミコロンを追加しない
  # ※ false の場合、セミコロンが無いとエラーになる箇所にだけセミコロンを追加する
  "semi": false
}
```

* npm i -D eslint-config-prettier  
  ※ ESLint のコードフォーマットに関連するルールを無効化し、バグを検出するルールのみを有効にするプラグイン。  
  ※ 以下 eslintrc.json に追加する。

```
  "extends": ["next/core-web-vitals", "prettier"]
```

<br>

#### lint

Nextjs ではデフォルトで eslint が入っており、公式の linter 設定を利用している。  
別途以下を追加し、eslintrc.json を変更している。  

* npm i -D eslint-plugin-unused-imports  
  ※ バージョン都合で `--legacy-peer-deps` が必要なケースもあるのでメモ

```
{
  "plugins": ["unused-imports"],
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "off"
  }
}
```

<br>

#### dummy server

* npm i -D body-parser
* npm i -D @types/body-parser
- npm i -D ts-node
- npm i -D nodemon  
  ※ コード変更後、自動で再起動する。開発時に利用する。  

* npm i -D express
* npm i -D @types/express  
  ※ package.json に express server へのプロキシを行うことで SameOrigin 問題を回避して接続できる。  
     (localhost:3000 -> localhost:5000 などの場合、port が異なるため Cookie を参照できないなど CORS 制約が起きて通信できないので proxy している。)  
  ※ format はかけるが lint はかけていない (eslintrc.yaml ファイルの修正が必要になるため)  
  ※ 以下の設定は npm run start (development env) で利用される。npm run build (prod env) では利用されない機能となる。  
     (参照) https://create-react-app.dev/docs/proxying-api-requests-in-development/

* server 準備  
  ※ 他プロジェクトからコピペ

* env への追加
  ※ Server Endpoint を示す変数に `http://localhost:5000` を設定する。

<br><br>

## Library

### UI

* npm i @mui/material @emotion/react @emotion/styled @mui/material-nextjs @emotion/cache  
  (参照) https://mui.com/material-ui/integrations/nextjs/  

* npm i @mui/icons-material  
  ※ Icon を利用する場合に必要  

* npm i @next/font  
  ※ Web フォント  
  ※ 利用することで、マシンにインストールされているフォントでなく Web にあるフォントが利用されることでマシン依存性がなくなる。  
  ※ また、読み込み速度が早くなる。  
  (が、本プロジェクトではおそらく「MS ゴシック」固定なので利用していない)

<br>

### Table

* npm i @tanstack/react-table  
  ※ Table 表示・制御時に利用する。  
  ※ 何も考えずに data/columns を渡せば Table 作れるので細かい要件がなければ使いたい。

<br>

### form

- npm i react-hook-form  
  ※ Form 表示・制御時に利用する。
  ※ formik よりシンプルで、制御が簡単なので細かい要件がなければ使いたい。

<br>

### API

* npm i query-string  
  ※ query 文字列を操作するもの。

### Jest

* npm i -D jest jest-environment-jsdom @types/jest @testing-library/react @testing-library/jest-dom  
  ※ React と異なり、デフォで jest や react-testing-library がないので導入する必要があった。  
  ※ jest.config.ts も追加しなければいけない点に注意  
  (参照) https://nextjs.org/docs/app/building-your-application/testing/jest

* 以下のように next.config.js ファイルでも exclude にコンパイル対象外と指定する必要がある。

```
  "exclude": [
    "node_modules",
    "**/*.test.ts",
    "**/*.test.tsx"
  ]
```

<br><br>

## build

- npm run server  
  ※ nodemon で dummy server 起動

- npm run format  
  ※ prettie による format 実施

- npm run lint  
  ※ eslint による lint 実施

- npm run dev  
  ※ 開発モードで起動

- npm run build  
  ※ ビルド

- npm run start  
  ※ npm run build で作成した production 資材を元に稼働させる。
