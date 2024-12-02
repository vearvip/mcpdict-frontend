import axios from "axios"

let baseURL = 'https://api.u646965.nyat.app:55269'
// baseURL = 'http://localhost:3000'
// @ts-ignore
export const fetcher = (url, ...args) => fetch(
  baseURL + url,
  ...args
).then((res) => res.json())

export const request = axios.create({
  baseURL,
  timeout: 10000
})
