const baseURL = 'http://beta.430.vear.vip'

// @ts-ignore
export const fetcher = (url, ...args) => fetch(
  baseURL + url,
  ...args
).then((res) => res.json())