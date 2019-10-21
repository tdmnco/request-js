# Request.js [![NPM Version](https://badge.fury.io/js/tdmnco-request.svg)](https://www.npmjs.com/package/tdmnco-request)

- [What is Request.js?](#what-is-request-js)
- [Installation](#installation)
- [Documentation](#documentation)
- [Getting Help](#getting-help)

## What is Request.js?

Request.js is a simple request tool for web applications.

It is used internally at Tidemann&Co for all our web applications that require request-response handling in JavaScript.

[↑ Back to top](#requestjs-)

## Installation

Installation is done via npm:

```
$ npm install tdmnco-request
```

[↑ Back to top](#requestjs-)

## Documentation

Using Request.js is a breeze. Consider these lines of code:

```javascript
import Request from 'tdmnco-request'

Request.get({ url: '/users/1' }).then((payload) => {
  // Houston, we have a payload!
})
```

## Getting Help

We believe in an open and welcoming community for all. Please post your questions in the [Issues](https://github.com/tdmnco/request-js/issues) section here at GitHub or contact Kasper Tidemann directly at [kt@tdmn.co](kt@tdmn.co).

Note that if your question has general relevance, it might be worth sharing with others.

---

Thanks for reading!

🎁
