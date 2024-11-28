const baseURL = 'https://frp-end.top:45374'

// @ts-ignore
export const fetcher = (url, ...args) => fetch(
  baseURL + url,
  ...args
).then((res) => res.json())