'use client'

import { FC, ReactNode, createContext, useRef, useState } from 'react'
import { Footer } from './Footer'

// おそらく Session (User 情報と SECT) だけ Root ではいらない見込み。
// ※ 更新用のメソッドは用意しているが、限定的なケースでしか更新しないこと (再レンダリングが走るため)
export interface User {
  id: string
  name: string
}

export const RootContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
  setErrorMessage: (message: string) => void
  clearErrorMessage: () => void
}>({
  user: null,
  setUser: () => {},
  setErrorMessage: () => {},
  clearErrorMessage: () => {},
})

interface RootProviderProps {
  children: ReactNode
}

export const RootProvider: FC<RootProviderProps> = ({
  children,
}: RootProviderProps) => {
  const [loginUser, setLoginUser] = useState<User | null>(null)
  // 共有用に適当に Div にしているが、伝えたいことは Ref で持つことで制御しようということだけ。
  const errorElementRef = useRef<HTMLDivElement>(null)

  const setErrorMessage = (message: string) => {
    // Element を Ref で保持しているので Style なども変化可能
    errorElementRef.current!.style.color = 'red'
    errorElementRef.current!.innerText = message
  }

  const clearErrorMessage = () => {
    errorElementRef.current!.style.color = 'black'
    errorElementRef.current!.innerText = 'error 領域(初期値)'
  }

  return (
    <RootContext.Provider
      value={{
        user: loginUser,
        setUser: setLoginUser,
        setErrorMessage: setErrorMessage,
        clearErrorMessage: clearErrorMessage,
      }}
    >
      {children}
      {/* Layout が SC 都合、このようにするしかない。CC にして良いなら Layout で行う */}
      <Footer errorElementRef={errorElementRef}></Footer>
    </RootContext.Provider>
  )
}
