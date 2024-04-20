'use client'

import { useRouter } from 'next/navigation'
import { startTransition, useEffect } from 'react'

// Server Component で例外が投げられると、最終的に本 Error Boundary に届く。
// 届くのだが、Error 情報は全て消える。
// ※ 開発環境での起動 (npm run dev) では残っているが、本番環境では消える。
// (参照) https://nextjs.org/docs/app/building-your-application/routing/error-handling#securing-sensitive-error-information
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // https://github.com/vercel/next.js/discussions/50744
  // reset 実施だけでは戻らなかったので、上記を参考に reload している。
  const router = useRouter()
  const reload = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="grid gap-5 justify-items-center">
      <h2>Something went wrong!</h2>
      <button className="btn btn-sm btn-info" onClick={() => reload()}>
        Try again
      </button>
    </div>
  )
}
