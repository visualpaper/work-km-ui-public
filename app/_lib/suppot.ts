import querystring from 'query-string'
import { AppError, isAppError } from './errors'
import { ERROR_CODE } from './messages'

export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

function buildUrl(url: any, query: any = null) {
  const strQuery = query ? `?${querystring.stringify(query)}` : ''
  return `${url}${strQuery}`
}

function buildHeaders(headers = {}) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  }
}
const defaultResponseHandler = (noContents: number[] = []) => {
  noContents.push(204)
  const hasJson = (status: number) => !noContents.some((st) => st === status)

  return async (response: Response, request: Request) => {
    if (response.ok) {
      return hasJson(response.status) ? response.json() : {}
    } else {
      const json = hasJson(response.status) ? await response.json() : {}

      // エラーコードがあれば、そのエラーコードを利用する。
      // ※ コードを追う限り普通にサーバの json にある code 値ベースで切っているので異論無いのだが、
      //    デフォルトとして Status コード別にエラーコードを切るというのも良いとは思う。
      if (json.code) {
        throw new AppError(String(json.code))
      }

      // エラーコードがなければ、予期せぬエラーとする。
      throw new AppError(ERROR_CODE.SERVER_UNEXPECTED)
    }
  }
}

export async function doRequest(
  url: any,
  method: string,
  { headers = {}, params = null, query = null }: any,
  responseHandler = defaultResponseHandler(),
) {
  const request = new Request(buildUrl(url, query), {
    method,
    headers: buildHeaders(headers),
    // コードを追う限り Cookie で Session を渡す方式だったので入れている。
    credentials: 'include',
    body: params ? JSON.stringify(params) : undefined,
  })

  try {
    const response = await fetch(request)
    return await responseHandler(response, request)
  } catch (error: any) {
    if (isAppError(error)) {
      throw error
    }

    // 接続 (ConnectionRequest / Connection / Socket) タイムアウト系のみ
    throw new AppError(ERROR_CODE.CLIENT_ERROR, error)
  }
}

export const get = (url: string, query = {}) => doRequest(url, 'GET', { query })

export const put = (url: string, params = {}, noContents: number[] = []) =>
  doRequest(url, 'PUT', { params }, defaultResponseHandler(noContents))

export const post = (url: string, params = {}, noContents: number[] = []) =>
  doRequest(url, 'POST', { params }, defaultResponseHandler(noContents))

export const deleteMethod = (url: string, query = {}) =>
  doRequest(url, 'DELETE', { query })
