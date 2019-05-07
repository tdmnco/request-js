// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'
const endpoint = '/users/1'
const errorObject = { error: 'User not found' }
const errorString = '{"error":"User not found"}'
const server = nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
const userObject = { status: 'User has been updated.' }
const userString = '{"status":"User has been updated."}'

// Tests:
test('Static PUT (200) ' + endpoint + ' (status)', () => {
  server.put(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(Request.put(baseURL + '/users', '1')).resolves.toHaveProperty('status', 200)
})

test('Static PUT (200) ' + endpoint + ' (payload)', () => {
  server.put(endpoint).reply(200, userObject)
  server.options(endpoint).reply(200)

  return expect(Request.put(baseURL + '/users', '1')).resolves.toHaveProperty('payload', userString)
})

test('Static PUT (404) ' + endpoint + ' (status)', () => {
  server.put(endpoint).reply(404)
  server.options(endpoint).reply(200)

  return expect(Request.put(baseURL + '/users', '1')).rejects.toHaveProperty('status', 404)
})

test('Static PUT (404) ' + endpoint + ' (payload)', () => {
  server.put('/users/1').reply(404, errorObject)
  server.options(endpoint).reply(200)

  return expect(Request.put(baseURL + '/users', '1')).rejects.toHaveProperty('payload', errorString)
})

test('Instance PUT (200) ' + endpoint + ' (status)', () => {
  server.put(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).put()).resolves.toHaveProperty('status', 200)
})

test('Instance PUT (200) ' + endpoint + ' (payload)', () => {
  server.put(endpoint).reply(200, userObject)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).put()).resolves.toHaveProperty('payload', userString)
})

test('Instance PUT (404) ' + endpoint + ' (status)', () => {
  server.put(endpoint).reply(404)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).put()).rejects.toHaveProperty('status', 404)
})

test('Instance PUT (404) ' + endpoint + ' (payload)', () => {
  server.put('/users/1').reply(404, errorObject)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).put()).rejects.toHaveProperty('payload', errorString)
})

