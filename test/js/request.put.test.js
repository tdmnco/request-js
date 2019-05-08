// Imports:
import { Request } from '../../src/js'
import { baseURL, server } from './server'

// Constants:
const data = { firstname: 'Kasper', lastname: 'Tidemann' }
const endpoint = '/users/1'
const url = baseURL + endpoint

// Tests:
test('Static PUT (200) ' + endpoint + ' (status)', () => {
  server().put(endpoint).reply(200)
  server().options(endpoint).reply(200)

  return expect(Request.put({ url })).resolves.toHaveProperty('status', 200)
})

test('Static PUT (200) ' + endpoint + ' (data)', () => {
  server().put(endpoint).reply(200, data)
  server().options(endpoint).reply(200)

  return expect(Request.put({ data, url })).resolves.toHaveProperty('data', JSON.stringify(data))
})

test('Static PUT (200) ' + endpoint + ' (timeout)', () => {
  server().put(endpoint).delay(20).reply(200, data)
  server().options(endpoint).reply(200)

  return expect(Request.put({ data, options: { timeout: 10 }, url })).rejects.toHaveProperty('error')
})

test('Instance PUT (200) ' + endpoint + ' (status)', () => {
  server().put(endpoint).reply(200)
  server().options(endpoint).reply(200)

  return expect(new Request({ url }).put()).resolves.toHaveProperty('status', 200)
})

test('Instance PUT (200) ' + endpoint + ' (data)', () => {
  server().put(endpoint).reply(200, data)
  server().options(endpoint).reply(200)

  return expect(new Request({ data, url }).put()).resolves.toHaveProperty('data', JSON.stringify(data))
})

test('Instance PUT (200) ' + endpoint + ' (timeout)', () => {
  server().put(endpoint).delay(20).reply(200, data)
  server().options(endpoint).reply(200)

  return expect(new Request({ data, options: { timeout: 10 }, url }).put()).rejects.toHaveProperty('error')
})
