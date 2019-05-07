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

  static patch(url, data) {
    return this._request('PATCH', url, data)
  }

  static post(url, data) {
    return this._request('POST', url, data)
  }

  static put(url, data) {
    return this._request('PUT', url, data)
  }

  // Static private functions:
  static _request(method, url, data) {
    const xhr = new XMLHttpRequest()

    xhr.open(method, url)

    xhr.send(data)

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const status = xhr.status
          
          if (status >= 100 && status < 400) {
            resolve({ payload: xhr.responseText, status })
          }
          
          if (status >= 400 && status < 600) {
            reject({ payload: xhr.responseText, status: status })
          }
        }
      }
    })
  } 

  // Functions:
  delete() {
    return this.constructor.delete(this.url, this.data)
  }
  
  get() {
    return this.constructor.get(this.url, this.data)
  }

  patch() {
    return this.constructor.patch(this.url, this.data)
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