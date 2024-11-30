let baseURL = 'https://frp-end.top:45374'
baseURL = 'http://localhost:3000'
// @ts-ignore
export const fetcher = (url, ...args) => fetch(
  baseURL + url,
  ...args
).then((res) => res.json())