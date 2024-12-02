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

export async function queryGeo() { 

  try {
    const ret = await fetcher(`/dialect/geo`)

    return ret
  } catch (error) { 
    console.error(error)
    return []
  }
}

export async function queryDialectInfos() { 

  try {
    const ret = await fetcher(`/dialect`)

    return ret
  } catch (error) { 
    console.error(error)
    return []
  }
}

  