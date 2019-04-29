// Imports:
import { Request } from '../../src/js'
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'

// Tests:
test('Static GET status code 200 by user id', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).get('/users/1').reply(200)

  return expect(Request.get(baseURL + '/users', '1')).resolves.toHaveProperty('status', 200)
})

test('Instance GET status code 200 by user id', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).get('/users/2').reply(200)

  return expect(new Request({ data: '2', url: baseURL + '/users' }).get()).resolves.toHaveProperty('status', 200)
})

test('Instance GET payload by user id', () => {
  nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' }).get('/users/3').reply(200, { user: { firstname: 'Kasper', lastname: 'Tidemann' }})

  return expect(new Request({ data: '3', url: baseURL + '/users' }).get()).resolves.toHaveProperty("payload", '{\"user\":{\"firstname\":\"Kasper\",\"lastname\":\"Tidemann\"}}')
})