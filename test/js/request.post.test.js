// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'
const data = { firstname: 'Kasper', lastname: 'Tidemann' }
const endpoint = '/users/1'
const server = nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
const url = baseURL + endpoint

// Tests:
test('Static POST (200) ' + endpoint + ' (status)', () => {
  server.post(endpoint).reply(200)

  return expect(Request.post({ url })).resolves.toHaveProperty('status', 200)
})

test('Static POST (200) ' + endpoint + ' (payload)', () => {
  server.post(endpoint).reply(200, data)

  return expect(Request.post({ data, url })).resolves.toHaveProperty('payload', JSON.stringify(data))
})

test('Instance POST (200) ' + endpoint + ' (status)', () => {
  server.post(endpoint).reply(200)

  return expect(new Request({ url }).post()).resolves.toHaveProperty('status', 200)
})

test('Instance POST (200) ' + endpoint + ' (payload)', () => {
  server.post(endpoint).reply(200, data)

  return expect(new Request({ data, url }).post()).resolves.toHaveProperty('payload', JSON.stringify(data))
})