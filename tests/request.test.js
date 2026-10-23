import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

vi.mock('antd', () => ({
  message: {
    warning: vi.fn(),
  },
}))

import { ApiError, request } from '@/utils/request'

function jsonResponse(payload, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => JSON.stringify(payload),
  }
}

describe('request', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  test('returns success payload and sends JSON body', async () => {
    fetch.mockResolvedValue(jsonResponse({ success: true, data: { ok: 1 } }))
    const result = await request({ url: '/char', method: 'POST', data: { a: 1 } })

    expect(result).toEqual({ success: true, data: { ok: 1 } })
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('https://server.mcpdict.vear.vip/char')
    expect(init.method).toBe('POST')
    expect(init.headers['Content-Type']).toBe('application/json')
    expect(init.body).toBe(JSON.stringify({ a: 1 }))
  })

  test('GET does not send a body', async () => {
    fetch.mockResolvedValue(jsonResponse({ success: true, data: [] }))
    await request({ url: '/dialect', params: { a: 'b' } })
    const [url, init] = fetch.mock.calls[0]
    expect(url).toContain('?a=b')
    expect(init.body).toBeUndefined()
  })

  test('HTTP error becomes ApiError with status and code', async () => {
    fetch.mockResolvedValue(
      jsonResponse({ success: false, code: 'BAD_REQUEST', message: '参数错误' }, 400),
    )
    await expect(request({ url: '/char' })).rejects.toMatchObject({
      name: 'ApiError',
      status: 400,
      code: 'BAD_REQUEST',
      message: '参数错误',
    })
  })

  test('non-JSON response becomes ApiError', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 502,
      text: async () => '<html>bad gateway</html>',
    })
    await expect(request({ url: '/char' })).rejects.toBeInstanceOf(ApiError)
  })

  test('aborted signal becomes ABORTED error', async () => {
    const controller = new AbortController()
    controller.abort()
    fetch.mockRejectedValue(Object.assign(new Error('aborted'), { name: 'AbortError' }))
    await expect(
      request({ url: '/char', signal: controller.signal }),
    ).rejects.toMatchObject({ code: 'ABORTED' })
  })
})
