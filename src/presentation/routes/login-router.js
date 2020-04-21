const HttpRespose = require('../helpers/http-reponse')

module.exports = class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase
  }

  route(httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpRespose.badRequest('email')
      }

      if (!password) {
        return HttpRespose.badRequest('password')
      }

      const accessToken = this.authUseCase.auth(email, password)

      if (!accessToken) {
        return HttpRespose.unauthorizedError()
      }

      return HttpRespose.ok({ accessToken })
    } catch (error) {
      return HttpRespose.serverError()
    }
  }
}
