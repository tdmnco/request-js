// Classes:
class Request {
  
  // Constructor:
  constructor(data) {
    this.data = data.data
    this.url = data.url
  }

  // Static functions:
  static delete(context) {
    return this._request('DELETE', context)
  }

  static get(context) {
    return this._request('GET', context)
  }

  static patch(context) {
    return this._request('PATCH', context)
  }

  static post(context) {
    return this._request('POST', context)
  }

  static put(context) {
    return this._request('PUT', context)
  }

  // Static private functions:
  static _request(method, context) {
    const xhr = new XMLHttpRequest()
    const options = context.options

    if (options) {
      for (let key in options) {
        xhr[key] = options[key]
      }
    }

    xhr.open(method, context.url)

    xhr.send(context.data)

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
    return this.constructor.delete(this)
  }
  
  get() {
    return this.constructor.get(this)
  }

  patch() {
    return this.constructor.patch(this)
  }

  post() {
    return this.constructor.post(this)
  }

  put() {
    return this.constructor.put(this)
  }
  
}

// Exports:
export { Request }