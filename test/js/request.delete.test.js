// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'
const endpoint = '/users/1'
const errorObject = { error: 'User not found' }
const errorString = '{"error":"User not found"}'
const server = nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
const statusObject = { status: 'User has been deleted.' }
const statusString = '{"status":"User has been deleted."}'

// Tests:
test('Static DELETE (200) ' + endpoint + ' (status)', () => {
  server.delete(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(Request.delete(baseURL + '/users', '1')).resolves.toHaveProperty('status', 200)
})

test('Static DELETE (200) ' + endpoint + ' (payload)', () => {
  server.delete(endpoint).reply(200, statusObject)
  server.options(endpoint).reply(200)

  return expect(Request.delete(baseURL + '/users', '1')).resolves.toHaveProperty('payload', statusString)
})

test('Static DELETE (404) ' + endpoint + ' (status)', () => {
  server.delete(endpoint).reply(404)
  server.options(endpoint).reply(200)

  return expect(Request.delete(baseURL + '/users', '1')).rejects.toHaveProperty('status', 404)
})

test('Static DELETE (404) ' + endpoint + ' (payload)', () => {
  server.delete(endpoint).reply(404, errorObject)
  server.options(endpoint).reply(200)

  return expect(Request.delete(baseURL + '/users', '1')).rejects.toHaveProperty('payload', errorString)
})

test('Instance DELETE (200) ' + endpoint + ' (status)', () => {
  server.delete(endpoint).reply(200)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).delete()).resolves.toHaveProperty('status', 200)
})

test('Instance DELETE (200) ' + endpoint + ' (payload)', () => {
  server.delete(endpoint).reply(200, statusObject)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).delete()).resolves.toHaveProperty('payload', statusString)
})

test('Instance DELETE (404) ' + endpoint + ' (status)', () => {
  server.delete(endpoint).reply(404)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).delete()).rejects.toHaveProperty('status', 404)
})

test('Instance DELETE (404) ' + endpoint + ' (payload)', () => {
  server.delete(endpoint).reply(404, errorObject)
  server.options(endpoint).reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).delete()).rejects.toHaveProperty('payload', errorString)
})