// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'
const endpoint = '/users/1'
const errorObject = { error: 'User not found' }
const errorString = '{"error":"User not found"}'
const server = nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
const userObject = { user: { firstname: 'Kasper', lastname: 'Tidemann' }}
const userString = '{"user":{"firstname":"Kasper","lastname":"Tidemann"}}'

// Tests:
test('Static GET (200) ' + endpoint + ' (status)', () => {
  server.get(endpoint).reply(200)

  return expect(Request.get(baseURL + '/users', '1')).resolves.toHaveProperty('status', 200)
})

test('Static GET (200) ' + endpoint + ' (payload)', () => {
  server.get(endpoint).reply(200, userObject)

  return expect(Request.get(baseURL + '/users', '1')).resolves.toHaveProperty('payload', userString)
})

test('Static GET (404) ' + endpoint + ' (status)', () => {
  server.get(endpoint).reply(404)

  return expect(Request.get(baseURL + '/users', '1')).rejects.toHaveProperty('status', 404)
})

test('Static GET (404) ' + endpoint + ' (payload)', () => {
  server.get(endpoint).reply(404, errorObject)

  return expect(Request.get(baseURL + '/users', '1')).rejects.toHaveProperty('payload', errorString)
})

test('Instance GET (200) ' + endpoint + ' (status)', () => {
  server.get(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).get()).resolves.toHaveProperty('status', 200)
})

test('Instance GET (200) ' + endpoint + ' (payload)', () => {
  server.get(endpoint).reply(200, userObject)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).get()).resolves.toHaveProperty('payload', userString)
})

test('Instance GET (404) ' + endpoint + ' (status)', () => {
  server.get(endpoint).reply(404)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).get()).rejects.toHaveProperty('status', 404)
})

test('Instance GET (404) ' + endpoint + ' (payload)', () => {
  server.get(endpoint).reply(404, errorObject)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).get()).rejects.toHaveProperty('payload', errorString)
})