import { message } from 'antd';
import qs from 'qs';

// 生产默认值；本地/预发通过 VITE_API_BASE_URL 覆盖。
// 同源反代时设为空字符串。
const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'https://server.mcpdict.vear.vip'
const DEFAULT_TIMEOUT = 30000

export class ApiError extends Error {
  constructor(message, { status, code, cause } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    if (cause) this.cause = cause
  }

  get isAborted() {
    return this.code === 'ABORTED'
  }
}

function buildUrl(url, params) {
  if (!params || Object.keys(params).length === 0) return `${baseURL}${url}`
  return `${baseURL}${url}${qs.stringify(params, { addQueryPrefix: true })}`
}

async function parseResponse(response) {
  let payload
  const text = await response.text()
  try {
    payload = text ? JSON.parse(text) : null
  } catch (error) {
    throw new ApiError(
      response.ok ? '服务端返回了无法解析的数据' : `请求失败（HTTP ${response.status}）`,
      { status: response.status, code: 'INVALID_RESPONSE', cause: error },
    )
  }

  if (!response.ok) {
    throw new ApiError(
      payload?.message || `请求失败（HTTP ${response.status}）`,
      { status: response.status, code: payload?.code || 'HTTP_ERROR' },
    )
  }

  if (!payload || payload.success !== true) {
    throw new ApiError(payload?.message || '请求失败', {
      status: response.status,
      code: payload?.code || 'API_ERROR',
    })
  }

  return payload
}

/**
 * 统一请求入口：超时、取消、HTTP 状态、非 JSON、业务 success 都归一为 ApiError。
 *
 * @param {Object} option
 * @param {string} option.url
 * @param {'GET'|'POST'|'PUT'|'DELETE'} [option.method]
 * @param {Object} [option.data]
 * @param {Object} [option.params]
 * @param {AbortSignal} [option.signal] 外部取消信号
 * @param {number} [option.timeout]
 * @param {boolean} [option.silent] 不弹 message 提示
 * @param {boolean} [option.formData]
 */
export async function request(option = {}) {
  const {
    url,
    method = 'GET',
    data,
    params,
    signal,
    timeout = DEFAULT_TIMEOUT,
    silent = false,
    formData = false,
  } = option

  const controller = new AbortController()
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, timeout)

  const onAbort = () => controller.abort()
  if (signal) {
    if (signal.aborted) controller.abort()
    else signal.addEventListener('abort', onAbort, { once: true })
  }

  try {
    const requestUrl = buildUrl(url, params)
    const init = {
      method,
      signal: controller.signal,
      headers: {},
    }

    if (method !== 'GET' && method !== 'HEAD') {
      if (formData) {
        init.body = Object.keys(data || {}).reduce((form, key) => {
          form.append(key, data[key])
          return form
        }, new FormData())
      } else if (data !== undefined) {
        init.headers['Content-Type'] = 'application/json'
        init.body = JSON.stringify(data)
      }
    }

    const response = await fetch(requestUrl, init)
    return await parseResponse(response)
  } catch (error) {
    let apiError
    if (error instanceof ApiError) {
      apiError = error
    } else if (error?.name === 'AbortError') {
      apiError = new ApiError(timedOut ? '请求超时，请稍后重试' : '请求已取消', {
        status: 0,
        code: 'ABORTED',
        cause: error,
      })
    } else {
      apiError = new ApiError('网络异常，请检查连接后重试', {
        status: 0,
        code: 'NETWORK_ERROR',
        cause: error,
      })
    }

    if (!silent && !apiError.isAborted) {
      message.warning(apiError.message)
    }
    throw apiError
  } finally {
    clearTimeout(timer)
    if (signal) signal.removeEventListener('abort', onAbort)
  }
}

export const fetcher = (url, init) =>
  request({
    url,
    method: init?.method || 'GET',
    data: init?.body ? JSON.parse(init.body) : undefined,
    signal: init?.signal,
  })
