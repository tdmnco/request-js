// Imports:
import Request from '../../dist/js/request.js'
import { baseURL, server } from './server'

// Constants:
const data = { lastname: 'Tidemann' }
const endpoint = '/users/1'
const url = baseURL + endpoint

// Tests:
test('Static PATCH (200) ' + endpoint + ' (status)', () => {
  server().patch(endpoint).reply(200)
  server().options(endpoint).reply(200)

  return expect(Request.patch({ url })).resolves.toHaveProperty('status', 200)
})

test('Static PATCH (200) ' + endpoint + ' (data)', () => {
  server().patch(endpoint).reply(200, data)
  server().options(endpoint).reply(200)

  return expect(Request.patch({ data, url })).resolves.toHaveProperty('data', JSON.stringify(data))
})

test('Static PATCH (200) ' + endpoint + ' (timeout)', () => {
  server().patch(endpoint).delay(20).reply(200, data)
  server().options(endpoint).reply(200)

  return expect(Request.patch({ data, timeout: 10, url })).rejects.toHaveProperty('error')
})

test('Static PATCH (200) ' + endpoint + ' (progress)', async () => {
  server().patch(endpoint).delay({ head: 10, body: 20 }).reply(200)
  server().options(endpoint).reply(200)

  let progress = 0

  await Request.patch({ onprogress: () => { progress++ }, url })

  expect(progress).toBeGreaterThan(0)
})

test('Instance PATCH (200) ' + endpoint + ' (status)', () => {
  server().patch(endpoint).reply(200)
  server().options(endpoint).reply(200)

  return expect(new Request({ url }).patch()).resolves.toHaveProperty('status', 200)
})

test('Instance PATCH (200) ' + endpoint + ' (data)', () => {
  server().patch(endpoint).reply(200, data)
  server().options(endpoint).reply(200)

  return expect(new Request({ data, url }).patch()).resolves.toHaveProperty('data', JSON.stringify(data))
})

test('Instance PATCH (200) ' + endpoint + ' (timeout)', () => {
  server().patch(endpoint).delay(20).reply(200, data)
  server().options(endpoint).reply(200)

  return expect(new Request({ data, timeout: 10, url }).patch()).rejects.toHaveProperty('error')
})

test('Instance PATCH (200) ' + endpoint + ' (progress)', async () => {
  server().patch(endpoint).delay({ head: 10, body: 20 }).reply(200)
  server().options(endpoint).reply(200)

  let progress = 0

  await new Request({ onprogress: () => { progress++ }, url }).patch()

  expect(progress).toBeGreaterThan(0)
})