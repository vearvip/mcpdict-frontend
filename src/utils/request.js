import { message } from 'antd';
import qs from 'qs';

let baseURL = 'https://server.mcpdict.vear.vip/'
// baseURL = 'http://localhost:3000' 

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
