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
test('Static PATCH (200) ' + endpoint + ' (status)', () => {
  server.patch(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(Request.patch(baseURL + '/users', '1')).resolves.toHaveProperty('status', 200)
})

test('Static PATCH (200) ' + endpoint + ' (payload)', () => {
  server.patch(endpoint).reply(200, userObject)
  server.options(endpoint).reply(200)

  return expect(Request.patch(baseURL + '/users', '1')).resolves.toHaveProperty('payload', userString)
})

test('Static PATCH (404) ' + endpoint + ' (status)', () => {
  server.patch(endpoint).reply(404)
  server.options(endpoint).reply(200)

  return expect(Request.patch(baseURL + '/users', '1')).rejects.toHaveProperty('status', 404)
})

test('Static PATCH (404) ' + endpoint + ' (payload)', () => {
  server.patch('/users/1').reply(404, errorObject)
  server.options(endpoint).reply(200)

  return expect(Request.patch(baseURL + '/users', '1')).rejects.toHaveProperty('payload', errorString)
})

test('Instance PATCH (200) ' + endpoint + ' (status)', () => {
  server.patch(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).patch()).resolves.toHaveProperty('status', 200)
})

test('Instance PATCH (200) ' + endpoint + ' (payload)', () => {
  server.patch(endpoint).reply(200, userObject)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).patch()).resolves.toHaveProperty('payload', userString)
})

test('Instance PATCH (404) ' + endpoint + ' (status)', () => {
  server.patch(endpoint).reply(404)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).patch()).rejects.toHaveProperty('status', 404)
})

test('Instance PATCH (404) ' + endpoint + ' (payload)', () => {
  server.patch('/users/1').reply(404, errorObject)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).patch()).rejects.toHaveProperty('payload', errorString)
})

