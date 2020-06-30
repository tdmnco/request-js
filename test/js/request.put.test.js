// Imports:
import { baseURL, server } from './server'

// Exports:
export function PUT(Request) {

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

    return expect(Request.put({ data, timeout: 10, url })).rejects.toHaveProperty('error')
  })

  test('Static PUT (200) ' + endpoint + ' (progress)', async () => {
    server().put(endpoint).delay({ head: 10, body: 20 }).reply(200)
    server().options(endpoint).reply(200)

    let progress = 0

    await Request.put({ onprogress: () => { progress++ }, url })

    expect(progress).toBeGreaterThan(0)
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

    return expect(new Request({ data, timeout: 10, url }).put()).rejects.toHaveProperty('error')
  })

  test('Instance PUT (200) ' + endpoint + ' (progress)', async () => {
    server().put(endpoint).delay({ head: 10, body: 20 }).reply(200)
    server().options(endpoint).reply(200)

    let progress = 0

    await new Request({ onprogress: () => { progress++ }, url }).put()

    expect(progress).toBeGreaterThan(0)
  })

}