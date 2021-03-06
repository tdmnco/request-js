// Imports:
import { baseURL, server } from './server'

// Exports:
export function POST(Request) {

  // Constants:
  const data = { firstname: 'Kasper', lastname: 'Tidemann' }
  const endpoint = '/users/1'
  const url = baseURL + endpoint

  // Tests:
  test('Static POST (200) ' + endpoint + ' (status)', () => {
    server().post(endpoint).reply(200)

    return expect(Request.post({ url })).resolves.toHaveProperty('status', 200)
  })

  test('Static POST (200) ' + endpoint + ' (data)', () => {
    server().post(endpoint).reply(200, data)

    return expect(Request.post({ data, url })).resolves.toHaveProperty('data', JSON.stringify(data))
  })

  test('Static POST (200) ' + endpoint + ' (timeout)', () => {
    server().post(endpoint).delay(20).reply(200, data)

    return expect(Request.post({ data, timeout: 10, url })).rejects.toHaveProperty('error')
  })

  test('Static POST (200) ' + endpoint + ' (progress)', async () => {
    server().post(endpoint).delay({ head: 10, body: 20 }).reply(200)

    let progress = 0

    await Request.post({ onprogress: () => { progress++ }, url })

    expect(progress).toBeGreaterThan(0)
  })

  test('Instance POST (200) ' + endpoint + ' (status)', () => {
    server().post(endpoint).reply(200)

    return expect(new Request({ url }).post()).resolves.toHaveProperty('status', 200)
  })

  test('Instance POST (200) ' + endpoint + ' (data)', () => {
    server().post(endpoint).reply(200, data)

    return expect(new Request({ data, url }).post()).resolves.toHaveProperty('data', JSON.stringify(data))
  })

  test('Instance POST (200) ' + endpoint + ' (timeout)', () => {
    server().post(endpoint).delay(20).reply(200, data)

    return expect(new Request({ data, timeout: 10, url }).post()).rejects.toHaveProperty('error')
  })

  test('Instance POST (200) ' + endpoint + ' (progress)', async () => {
    server().post(endpoint).delay({ head: 10, body: 20 }).reply(200)

    let progress = 0

    await new Request({ onprogress: () => { progress++ }, url }).post()

    expect(progress).toBeGreaterThan(0)
  })

}