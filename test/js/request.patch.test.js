// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'
const data = { lastname: 'Tidemann' }
const endpoint = '/users/1'
const server = nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
const url = baseURL + endpoint

// Tests:
test('Static PATCH (200) ' + endpoint + ' (status)', () => {
  server.patch(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(Request.patch({ url })).resolves.toHaveProperty('status', 200)
})

test('Static PATCH (200) ' + endpoint + ' (payload)', () => {
  server.patch(endpoint).reply(200, data)
  server.options(endpoint).reply(200)

  return expect(Request.patch({ data, url })).resolves.toHaveProperty('payload', JSON.stringify(data))
})

test('Instance PATCH (200) ' + endpoint + ' (status)', () => {
  server.patch(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(new Request({ url }).patch()).resolves.toHaveProperty('status', 200)
})

test('Instance PATCH (200) ' + endpoint + ' (payload)', () => {
  server.patch(endpoint).reply(200, data)
  server.options(endpoint).reply(200)

  return expect(new Request({ data, url }).patch()).resolves.toHaveProperty('payload', JSON.stringify(data))
})