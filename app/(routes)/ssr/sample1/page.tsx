import { getUsersForSSR } from '@/app/_lib/users/user'
import { Box, Typography } from '@mui/material'
import { Contents } from './_component/Contents'

// Server Component の場合、以下の特性がある。
// * hooks が使えない
//   ※ サーバで html まで生成されるためブラウザで操作する hooks が使えない
//   ※ hooks が使えないので Context も使えない。
//   ※ Context が使えないものの、
//      本例のように Client Component まで通せば Context を利用できるので、
//      以下のような状態管理ライブラリを使いたくない。
//      - Redux: 数年使ったことはあるが学習コストが高く、hooks の登場で今や使ってない。
//        SSR とのかみ合わせを見るに使うことをそんなに望まれていないように見えるため。
//        (参照) https://redux.js.org/usage/nextjs#overall-recommendations
//      - Zustand: 最近の良い感じので個人ならこれを利用するのだが、
//        Redux などと同じく SSR を使う場合の制限/セットアップ方法がかなり辛そう。
//        (参照) https://docs.pmnd.rs/zustand/guides/nextjs
//
// * Error を throw すると error.jsx (Error Boundary) まで届くが、
//   その Error の内容は機密情報担保都合、NextJS で勝手に消される。
//   ※ なので、API レスポンスにある情報がほしいのであれば、
//      例外をキャッチして Serialize 可能な状態なものに変換し扱わなければならない。
//   (参照) https://nextjs.org/docs/app/building-your-application/routing/error-handling#securing-sensitive-error-information
export default async function SsrSample1() {
  const { users, message } = await getUsersForSSR()

  return (
    <Box sx={{ padding: 10 }}>
      <Typography variant="h1">SSR Sample</Typography>
      <Contents users={users} errorMessage={message}></Contents>
    </Box>
  )
}
