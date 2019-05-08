// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'
const data = { user: { id: '1' } }
const endpoint = '/users/1'
const server = nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
const url = baseURL + endpoint

// Tests:
test('Static DELETE (200) ' + endpoint + ' (status)', () => {
  server.delete(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(Request.delete({ url })).resolves.toHaveProperty('status', 200)
})

test('Static DELETE (200) ' + endpoint + ' (payload)', () => {
  server.delete(endpoint).reply(200, data)
  server.options(endpoint).reply(200)

  return expect(Request.delete({ data, url })).resolves.toHaveProperty('payload', JSON.stringify(data))
})

test('Instance DELETE (200) ' + endpoint + ' (status)', () => {
  server.delete(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(new Request({ data, url }).delete()).resolves.toHaveProperty('status', 200)
})

test('Instance DELETE (200) ' + endpoint + ' (payload)', () => {
  server.delete(endpoint).reply(200, data)
  server.options(endpoint).reply(200)

  return expect(new Request({ data, url }).delete()).resolves.toHaveProperty('payload', JSON.stringify(data))
})
