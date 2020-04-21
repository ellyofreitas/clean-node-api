const HttpRespose = require('../helpers/http-reponse')

module.exports = class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase
  }

  route(httpRequest) {
    if (
      !httpRequest ||
      !httpRequest.body ||
      !this.authUseCase ||
      !this.authUseCase.auth
    ) {
      return HttpRespose.serverError()
    }

    const { email, password } = httpRequest.body
    if (!email) {
      return HttpRespose.badRequest('email')
    }

    if (!password) {
      return HttpRespose.badRequest('password')
    }

    this.authUseCase.auth(email, password)

    return HttpRespose.unauthorizedError()
  }
}
