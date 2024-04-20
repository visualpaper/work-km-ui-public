'use client'

import styled from '@emotion/styled'
import { Button } from '@mui/material'

// Styled Component の Wrap は以下のように実施する。
// ※ Component を本当に Wrap するだけで、あとは何もしない形が望ましい。
// ※ 複数の Component をまとめる系 (km 番号検索とか) の場合は、props をうまく外に出す必要がある点に注意。
const KpsButton = styled(Button)(({ theme }) => ({
  minHeight: '24px',
  height: '24px',
  fontSize: '15px',
  color: 'black',
  backgroundColor: '#e0e0e0',
  borderRadius: '2px',
  boxShadow: '1px 1px 2px 1px #777777',
  '&': {
    disableRipple: true,
  },
  '&:hover': {
    backgroundColor: '#e0e0e0',
    boxShadow: '1px 1px 2px 1px #777777',
  },
  '&:active': {
    // ボタンをY方向のみ 2px 移動
    transform: 'translate(0, 2px)',
    boxShadow: 'none',
  },
  '&:active:active': {
    transition: 'none',
  },
}))

// 最近以下の指定が非推奨になったらしいのでコメントアウト
// KpsButton.defaultProps = {
//   // 塗りつぶし
//   variant: 'contained',
//   // Click 時の Ripple(アニメーション) を off
//   disableRipple: true,
//   fullWidth: true,
// }

export default KpsButton
