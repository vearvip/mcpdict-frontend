const baseURL = 'http://hangnien.vear.vip'

// @ts-ignore
export const fetcher = (url, ...args) => fetch(
  baseURL + url,
  ...args
).then((res) => res.json())