// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'
const endpoint = '/users/1'
const payload = { user: { firstname: 'Kasper', lastname: 'Tidemann' } }
const server = nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
const url = baseURL + endpoint

// Tests:
test('Static GET (200) ' + endpoint + ' (status)', () => {
  server.get(endpoint).reply(200)

  return expect(Request.get(url)).resolves.toHaveProperty('status', 200)
})

test('Static GET (200) ' + endpoint + ' (payload)', () => {
  server.get(endpoint).reply(200, payload)

  return expect(Request.get(url)).resolves.toHaveProperty('payload', JSON.stringify(payload))
})

test('Instance GET (200) ' + endpoint + ' (status)', () => {
  server.get(endpoint).reply(200)

  return expect(new Request({ url }).get()).resolves.toHaveProperty('status', 200)
})

test('Instance GET (200) ' + endpoint + ' (payload)', () => {
  server.get(endpoint).reply(200, payload)

  return expect(new Request({ url }).get()).resolves.toHaveProperty('payload', JSON.stringify(payload))
})
