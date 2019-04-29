// Exports:
export function queryString(url, data) {
  if (url.slice(-1) !== '/') {
    url = url + '/'
  }

  const type = typeof data

  if (type === 'number' || type === 'string') {
    return url + data
  }

  const query = [url]
  
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    }
  }
  
  return query.join('&')
}