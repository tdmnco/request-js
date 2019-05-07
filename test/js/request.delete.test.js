// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'
const endpoint = '/users/1'
const payload = { user: { id: '1' }}
const server = nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
const url = baseURL + endpoint

// Tests:
test('Static DELETE (200) ' + endpoint + ' (status)', () => {
  server.delete(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(Request.delete(url)).resolves.toHaveProperty('status', 200)
})

test('Static DELETE (200) ' + endpoint + ' (payload)', () => {
  server.delete(endpoint).reply(200, payload)
  server.options(endpoint).reply(200)

  return expect(Request.delete(url, payload)).resolves.toHaveProperty('payload', JSON.stringify(payload))
})

test('Instance DELETE (200) ' + endpoint + ' (status)', () => {
  server.delete(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: payload, url }).delete()).resolves.toHaveProperty('status', 200)
})

test('Instance DELETE (200) ' + endpoint + ' (payload)', () => {
  server.delete(endpoint).reply(200, payload)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: payload, url }).delete()).resolves.toHaveProperty('payload', JSON.stringify(payload))
})
