// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'

// Tests:
test('Static POST (200) /users/1 (status)', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).post('/users/1').reply(200)

  return expect(Request.post(baseURL + '/users/1')).resolves.toHaveProperty('status', 200)
})

test('Static POST (200) /users/1 (payload)', () => {
  const payload = { firstname: 'Kasper', lastname: 'Tidemann' }

  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).post('/users/1', payload).reply(200, { message: 'User data updated.' })

  return expect(Request.post(baseURL + '/users/1', payload)).resolves.toHaveProperty('payload', '{"message":"User data updated."}')
})

test('Static POST (404) /users/1 (status)', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).post('/users/1').reply(404)

  return expect(Request.post(baseURL + '/users/1')).rejects.toHaveProperty('status', 404)
})

test('Static POST (404) /users/1 (payload)', () => {
  const payload = { firstname: 'Kasper', lastname: 'Tidemann' }

  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).post('/users/1', payload).reply(404, { message: 'User not found.' })

  return expect(Request.post(baseURL + '/users/1', payload)).rejects.toHaveProperty('payload', '{"message":"User not found."}')
})

test('Instance POST (200) /users/1 (status)', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).post('/users/1').reply(200)

  return expect(new Request({ url: baseURL + '/users/1' }).post()).resolves.toHaveProperty('status', 200)
})

test('Instance POST (200) /users/1 (payload)', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).post('/users/1').reply(200, { message: 'User data updated.' })

  return expect(new Request({ url: baseURL + '/users/1' }).post()).resolves.toHaveProperty('payload', '{"message":"User data updated."}')
})

test('Instance POST (404) /users/1 (status)', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).post('/users/1').reply(404)

  return expect(new Request({ url: baseURL + '/users/1' }).post()).rejects.toHaveProperty('status', 404)
})

test('Instance POST (404) /users/1 (payload)', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).post('/users/1').reply(404, { message: 'User not found.' })

  return expect(new Request({ url: baseURL + '/users/1' }).post()).rejects.toHaveProperty('payload', '{"message":"User not found."}')
})