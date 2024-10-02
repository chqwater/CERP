import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/token/test',
    method: 'get',
    response() {
      return {
        code: 401,
        message: 'long time no use, please login again'
      }
    }
  }
] as MockMethod[]