// Imports:
import nock from 'nock'

// Constants:
const baseURL = 'https://tdmnco-request-js.api'

// Functions:
function server() {
  return nock(baseURL).defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
}

// Exports:
export { baseURL, server }