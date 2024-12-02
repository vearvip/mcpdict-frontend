import { fetcher } from "../utils/request"
import qs from 'qs'


export async function queryChars(params: {
  char: string | undefined
  dialect?: string 
}) { 
  console.log('params',params) 
  if (!params.char) {
    return []
  }
  try {
    const ret = await fetcher(`/char?char=${params.char}&dialect=${params.dialect}`)

    return ret
  } catch (error) { 
    console.error(error)
    return []
  }
}


export async function queryLangs(): Promise<{
  langs: string[]
}> {  
  try {
    const ret: {
      data: string[]
    } = await fetcher('https://www.fastmock.site/mock/5f99ddefce3c648ecfe8396d398bf461/asdf/book') 
    return {
      langs: ret.data
    }
  } catch (error) { 
    return {
      langs: []
    }
  }
}

// export async function queryFangYans() {  
//   try {
//     const ret: {
//       data 
//     } = await fetcher('/fang-yan/query', {
//       method: 'POST'
//     }) 
//     return ret.data
//   } catch (error) { 
//     return {
//       langs: []
//     }
//   }
// }