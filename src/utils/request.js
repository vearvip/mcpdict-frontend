let baseURL = 'https://api.mcpdict.vear.vip'
// baseURL = 'http://localhost:3000'
// @ts-ignore
export const fetcher = (url, ...args) => fetch(
  baseURL + url,
  ...args
).then((res) => res.json())
 