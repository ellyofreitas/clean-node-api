const HttpRespose = require('../helpers/http-reponse')

module.exports = class LoginRouter {
  route(httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpRespose.serverError()
    }

    const { email, password } = httpRequest.body
    if (!email) {
      return HttpRespose.badRequest('email')
    }

    if (!password) {
      return HttpRespose.badRequest('password')
    }
  }
}
