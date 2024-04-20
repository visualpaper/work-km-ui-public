'use client'

import { createTheme } from '@mui/material/styles'

// [基本方針]
// https://smartdevpreneur.com/when-to-use-the-mui-sx-prop-styled-api-or-theme-override/ を参考にしている。
//
// * sx
//    - 「一回限り」のスタイリングに使用
//
// * styled
//   - 同じタイプの複数のコンポーネントに同じスタイルを適用する必要がある場合は、API を使用してスタイル付きコンポーネントを作成します。
//
// * theme
//   - 同じタイプのすべてのコンポーネントを同じスタイルにしたい場合は、テーマのオーバーライドを使用します。
const theme = createTheme({
  typography: {
    // Web Font は利用しない。
    // ※ 以下のようにすれば近しい Font になるが、MS ゴシック相当のものはなかった。
    //    ので、マシンにインストールされているはずの MS ゴシック直指定で進めている。
    //
    // > import { Noto_Sans_JP } from 'next/font/google';
    // > const robotoMono = Noto_Sans_JP({
    // >   weight: ['300', '400', '500', '700'],
    // >   subsets: ["latin"],
    // >   display: 'swap' // font の読み込み完了後に表示する
    // > })
    fontFamily: 'ＭＳ ゴシック',

    // 各 variant に沿ったものを定義し、それに沿って定義すること。
    // ※ レスポンシブ対応はしない想定 (media query など利用しないはず) だが、
    //    px 指定にするかどうか (rem/em や vw/vh) を使うかは要相談
    //    (rem 指定時の計算式は「指定 rem * typography fontSize /14 * 指定 html fontSize / html fontSize」となる)
    h1: {
      fontSize: '20px',
    },
    h2: {
      fontSize: '18px',
    },
    body1: {
      fontSize: '16px',
    },
    button: {
      fontSize: '15px',
    },
  },
})

export default theme
