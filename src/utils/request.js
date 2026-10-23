import { message } from 'antd';
import qs from 'qs';

// 生产默认值；本地/预发通过 VITE_API_BASE_URL 覆盖。
// pre 环境用同源反代时设为空字符串。
const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'https://server.mcpdict.vear.vip'

// @ts-ignore
export const fetcher = (url, ...args) => fetch(
  baseURL + url,
  ...args
).then(async (res) => {
  const result = await res.json()
  if (result.success) {
    return result
  } else {
    message.warning(result.message)
    throw new Error(result.message)
  } 
})
 

export function request(option = {
  method: 'GET',
  formData: false
}) {
  let url = `${baseURL}${option.url}`
  if (option.params) {
    url = `${url}${qs.stringify(option.params, { addQueryPrefix: true })}`
  } 
  // console.log('url',)
  return fetch(url, {
    method: option.method,
    headers: option.formData ? undefined : {
      'Content-Type': 'application/json',
    },
    body: option.formData ? Object.keys(option.data).reduce((ret, val) => {
      ret.append(val, option.data[val])
      return ret
    }, new FormData()) : JSON.stringify(option.data),
  }).then(async (res) => {
    const result = await res.json()
    if (result.success) {
      return result
    } else {
      message.warning(result.message)
      throw new Error(result.message)
    } 
  })
}
