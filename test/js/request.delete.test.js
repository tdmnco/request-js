// Imports:
import { baseURL, server } from './server'

// Exports:
export function DELETE(Request) {

 // Constants:
  const data = { user: { id: '1' } }
  const endpoint = '/users/1'
  const url = baseURL + endpoint

  // Tests:
  test('Static DELETE (200) ' + endpoint + ' (status)', () => {
    server().delete(endpoint).reply(200)
    server().options(endpoint).reply(200)

    return expect(Request.delete({ url })).resolves.toHaveProperty('status', 200)
  })

  test('Static DELETE (200) ' + endpoint + ' (data)', () => {
    server().delete(endpoint).reply(200, data)
    server().options(endpoint).reply(200)

    return expect(Request.delete({ data, url })).resolves.toHaveProperty('data', JSON.stringify(data))
  })

  test('Static DELETE (200) ' + endpoint + ' (timeout)', () => {
    server().delete(endpoint).delay(20).reply(200, data)
    server().options(endpoint).reply(200)

    return expect(Request.delete({ data, timeout: 10, url })).rejects.toHaveProperty('error')
  })

  test('Static DELETE (200) ' + endpoint + ' (progress)', async () => {
    server().delete(endpoint).delay({ head: 10, body: 20 }).reply(200)
    server().options(endpoint).reply(200)

    let progress = 0

    await Request.delete({ onprogress: () => { progress++ }, url })

    expect(progress).toBeGreaterThan(0)
  })

  test('Instance DELETE (200) ' + endpoint + ' (status)', () => {
    server().delete(endpoint).reply(200)
    server().options(endpoint).reply(200)

    return expect(new Request({ data, url }).delete()).resolves.toHaveProperty('status', 200)
  })

  test('Instance DELETE (200) ' + endpoint + ' (data)', () => {
    server().delete(endpoint).reply(200, data)
    server().options(endpoint).reply(200)

    return expect(new Request({ data, url }).delete()).resolves.toHaveProperty('data', JSON.stringify(data))
  })

  test('Instance DELETE (200) ' + endpoint + ' (timeout)', () => {
    server().delete(endpoint).delay(10).reply(200, data)
    server().options(endpoint).reply(200)

    return expect(new Request({ data, timeout: 10, url }).delete()).rejects.toHaveProperty('error')
  })

  test('Instance DELETE (200) ' + endpoint + ' (progress)', async () => {
    server().delete(endpoint).delay({ head: 10, body: 20 }).reply(200)
    server().options(endpoint).reply(200)

    let progress = 0

    await new Request({ onprogress: () => { progress++ }, url }).delete()

    expect(progress).toBeGreaterThan(0)
  }) 

}