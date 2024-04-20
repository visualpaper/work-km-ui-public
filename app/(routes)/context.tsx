'use client'

import { createContext, ReactNode, FC, useState } from 'react'

// おそらく Session (User 情報と SECT) だけ Root ではいらない見込み。
// ※ 更新用のメソッドは用意しているが、限定的なケースでしか更新しないこと (再レンダリングが走るため)
export interface User {
  id: string
  name: string
}

export const UserContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({
  user: null,
  setUser: () => {},
})

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [loginUser, setLoginUser] = useState<User | null>(null)

  return (
    <UserContext.Provider
      value={{
        user: loginUser,
        setUser: setLoginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
