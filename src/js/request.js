// Imports:
import { queryString } from './'

// Classes:
class Request {
  
  // Constructor:
  constructor(data) {
    this.data = data.data
    this.url = data.url
  }

  // Static functions:
  static delete(url, data) {
    return this._request('DELETE', url, data)
  }

  static get(url, data) {
    return this._request('GET', url, data)
  }

  static post(url, data) {
    return this._request('POST', url, data)
  }

  static put(url, data) {
    return this._request('PUT', url, data)
  }

  // Static private functions:
  static _request(method, url, data) {
    if (method === 'GET') {
      url = queryString(url, data)
    }

    const xhr = new XMLHttpRequest()

    const promise = new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
          resolve({ payload: xhr.responseText, status: xhr.status })
        }
      }
    })

    xhr.open(method, url)

    xhr.send(data)

    return promise
  } 

  // Functions:
  delete() {
    return this.constructor.delete(this.url, this.data)
  }
  
  get() {
    return this.constructor.get(this.url, this.data)
  }

  post() {
    return this.constructor.post(this.url, this.data)
  }

  put() {
    return this.constructor.put(this.url, this.data)
  }
  
}

// Exports:
export { Request }

/*

  const request = new Request({

  })

  Request.post({

  })

*/