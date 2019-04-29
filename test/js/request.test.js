// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'

// Tests:
test('Static GET (200) by user id', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).get('/users/1').reply(200)

  return expect(Request.get(baseURL + '/users', '1')).resolves.toHaveProperty('status', 200)
})

test('Static GET (200) payload by user id', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).get('/users/1').reply(200, { user: { firstname: 'Kasper', lastname: 'Tidemann' }})

  return expect(Request.get(baseURL + '/users', '1')).resolves.toHaveProperty('payload', '{\"user\":{\"firstname\":\"Kasper\",\"lastname\":\"Tidemann\"}}')
})

test('Static GET (404) by user id', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).get('/users/1').reply(404)

  return expect(Request.get(baseURL + '/users', '1')).rejects.toHaveProperty('status', 404)
})

test('Static GET (404) payload by user id', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).get('/users/1').reply(404, { error: 'User not found' })

  return expect(Request.get(baseURL + '/users', '1')).rejects.toHaveProperty('payload', '{\"error\":\"User not found\"}')
})

test('Instance GET (200) by user id', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).get('/users/1').reply(200)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).get()).resolves.toHaveProperty('status', 200)
})

test('Instance GET (200) payload by user id', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).get('/users/1').reply(200, { user: { firstname: 'Kasper', lastname: 'Tidemann' }})

  return expect(new Request({ data: '1', url: baseURL + '/users' }).get()).resolves.toHaveProperty('payload', '{\"user\":{\"firstname\":\"Kasper\",\"lastname\":\"Tidemann\"}}')
})

test('Instance GET (404) by user id', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).get('/users/1').reply(404)

  return expect(new Request({ data: '1', url: baseURL + '/users' }).get()).rejects.toHaveProperty('status', 404)
})

test('Instance GET (404) payload by user id', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).get('/users/1').reply(404, { error: 'User not found' })

  return expect(new Request({ data: '1', url: baseURL + '/users' }).get()).rejects.toHaveProperty('payload', '{\"error\":\"User not found\"}')
})

