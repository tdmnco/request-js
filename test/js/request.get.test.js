// Imports:
import Request from '../../dist/js/request.js'
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

  return expect(Request.get({ timeout: 10, url })).rejects.toHaveProperty('error')
})

test('Static GET (200) ' + endpoint + ' (progress)', async () => {
  server().get(endpoint).delay({ head: 10, body: 20 }).reply(200)

  let progress = 0

  await Request.get({ onprogress: () => { progress++ }, url })

  expect(progress).toBeGreaterThan(0)
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

  return expect(new Request({ data, timeout: 10, url }).get()).rejects.toHaveProperty('error')
})

test('Instance GET (200) ' + endpoint + ' (progress)', async () => {
  server().get(endpoint).delay({ head: 10, body: 20 }).reply(200)

  let progress = 0

  await new Request({ onprogress: () => { progress++ }, url }).get()

  expect(progress).toBeGreaterThan(0)
})