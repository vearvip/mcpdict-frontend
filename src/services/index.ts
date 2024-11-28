import { Lang, Zi } from "../types"
import { fetcher } from "../utils/request"
import qs from 'qs'


export async function searchWords(params) { 
  console.log('params',params) 
  if (!params.zis) {
    return []
  }
  try {
    const ret: {
      data: Zi[]
    } = await fetcher('/zi/query', {
      method: 'POST',
      data: params
    })

    return ret.data
  } catch (error) {
    // console.error(error)
    return []
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

export async function queryFangYans() {  
  try {
    const ret: {
      data 
    } = await fetcher('/fang-yan/query', {
      method: 'POST'
    }) 
    return ret.data
  } catch (error) { 
    return {
      langs: []
    }
  }
}