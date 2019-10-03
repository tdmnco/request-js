// Classes:
class Request {
  
  // Constructor:
  constructor(context) {
    this.async = context.async
    this.data = context.data
    this.header = context.header
    this.onprogress = context.onprogress
    this.timeout = context.timeout
    this.url = context.url
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
    const header = context.header
    const xhr = new XMLHttpRequest()

    if (header) {
      for (let key in header) {
        xhr.setRequestHeader(key, header[key])
      }
    }

    xhr.open(method, context.url, context.async)

    xhr.timeout = context.timeout

    xhr.send(context.data)

    return new Promise((resolve, reject) => {
      xhr.onabort = (error) => {
        reject({ error })
      }

      xhr.onerror = (error) => {
        reject({ error })
      }

      if (context.onprogress) {
        xhr.onprogress = context.onprogress
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const status = xhr.status
          
          if (status >= 100 && status < 400) {
            resolve({ data: xhr.responseText, status })
          }
          
          if (status >= 400 && status < 600) {
            reject({ data: xhr.responseText, status })
          }
        }
      }

      xhr.ontimeout = (error) => {
        reject({ error })
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
export default Request