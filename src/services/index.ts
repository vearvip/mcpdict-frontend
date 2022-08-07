import { Lang, Zi } from "../types"
import { fetcher } from "../utils/request"

export async function searchWords(words: string): Promise<{
  ssrSearchData: Zi[]
}> {  
  if (!words) {
    return { 
      ssrSearchData: []
    }
  }
  try {
    const ret: {
      data: Zi[]
    } = await fetcher('https://www.fastmock.site/mock/5f99ddefce3c648ecfe8396d398bf461/asdf/ok?q=' + words)

    return{
      ssrSearchData: ret.data
    }
  } catch (error) {
    // console.error(error)
    return {
      ssrSearchData: []
    }
  }
}


export async function queryLangs(): Promise<{
  langs: Lang[]
}> {  
  try {
    const ret: {
      data: Lang[]
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