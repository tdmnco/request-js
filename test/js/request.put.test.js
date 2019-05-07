// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'
const endpoint = '/users/1'
const payload = { firstname: 'Kasper', lastname: 'Tidemann' }
const server = nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
const url = baseURL + endpoint

// Tests:
test('Static PUT (200) ' + endpoint + ' (status)', () => {
  server.put(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(Request.put(url)).resolves.toHaveProperty('status', 200)
})

test('Static PUT (200) ' + endpoint + ' (payload)', () => {
  server.put(endpoint).reply(200, payload)
  server.options(endpoint).reply(200)

  return expect(Request.put(url, payload)).resolves.toHaveProperty('payload', JSON.stringify(payload))
})

test('Instance PUT (200) ' + endpoint + ' (status)', () => {
  server.put(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(new Request({ url }).put()).resolves.toHaveProperty('status', 200)
})

test('Instance PUT (200) ' + endpoint + ' (payload)', () => {
  server.put(endpoint).reply(200, payload)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: payload, url }).put()).resolves.toHaveProperty('payload', JSON.stringify(payload))
})
