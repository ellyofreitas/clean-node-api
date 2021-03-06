const UnauthorizedError = require('./unauthorized-error')
const ServerError = require('./server-error')

module.exports = class HttpRespose {
  static badRequest(error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static serverError() {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static unauthorizedError() {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }

  static ok(body) {
    return {
      statusCode: 200,
      body
    }
  }
}
