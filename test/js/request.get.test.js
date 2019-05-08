// Imports:
import { Request } from '../../src/js'
import { baseURL, server } from './server'

// Constants:
const data = { user: { firstname: 'Kasper', lastname: 'Tidemann' } }
const endpoint = '/users/1'
const url = baseURL + endpoint

// Tests:
test('Static GET (200) ' + endpoint + ' (status)', () => {
  server().get(endpoint).reply(200)

  return expect(Request.get({ url })).resolves.toHaveProperty('status', 200)
})

test('Static GET (200) ' + endpoint + ' (data)', () => {
  server().get(endpoint).reply(200, data)

  return expect(Request.get({ url })).resolves.toHaveProperty('data', JSON.stringify(data))
})

test('Static GET (200) ' + endpoint + ' (timeout)', () => {
  server().get(endpoint).delay(20).reply(200)

  return expect(Request.get({ url, options: { timeout: 10 } })).rejects.toHaveProperty('error')
})

test('Instance GET (200) ' + endpoint + ' (status)', () => {
  server().get(endpoint).reply(200)

  return expect(new Request({ url }).get()).resolves.toHaveProperty('status', 200)
})

test('Instance GET (200) ' + endpoint + ' (data)', () => {
  server().get(endpoint).reply(200, data)

  return expect(new Request({ data, url }).get()).resolves.toHaveProperty('data', JSON.stringify(data))
})

test('Instance GET (200) ' + endpoint + ' (timeout)', () => {
  server().get(endpoint).delay(20).reply(200)

  return expect(new Request({ data, options: { timeout: 10 }, url }).get()).rejects.toHaveProperty('error')
})