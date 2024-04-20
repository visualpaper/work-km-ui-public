import { unstable_noStore as noStore } from 'next/cache'
import { BASE_URL, deleteMethod, get, post, put } from './../suppot'
import { AppError } from './../errors'

export interface User {
  id: number
  name: string
}

const url = () => BASE_URL + `/v1/users`
const userUrl = (id: number) => BASE_URL + `/v1/users/${id}`

export async function getUsersForSSR(): Promise<{
  users: User[]
  message?: string
}> {
  try {
    const responseUsers = await getUsers()
    return {
      users: responseUsers,
    }
  } catch (e: any) {
    if (e instanceof AppError) {
      return {
        users: [],
        message: e.getDisplayMessage(),
      }
    }
    return {
      users: [],
      message: 'error',
    }
  }
}

export async function getUsers(): Promise<User[]> {
  // これを付けないとサーバ node 側でキャッシュされる。
  // NextJS での利点というのはわかるのだが、本プロジェクトの場合は基本落としたほうが良い気がする。
  noStore()

  const response = await get(url())
  return response.users
}

export async function addUser(user: User): Promise<void> {
  await post(url(), {
    ...user,
  })
}

export async function updateUser(user: User): Promise<void> {
  // Post 以外は効くらしい。なぜか Put で効くのか不明だが..
  noStore()

  await put(userUrl(user.id), {
    name: user.name,
  })
}

export async function deleteUser(id: number): Promise<void> {
  await deleteMethod(userUrl(id))
}
