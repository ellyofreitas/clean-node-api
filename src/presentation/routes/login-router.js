const HttpRespose = require('../helpers/http-reponse')
const MissingParamError = require('../helpers/missing-param-error')

module.exports = class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase
  }

  async route(httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpRespose.badRequest(new MissingParamError('email'))
      }

      if (!password) {
        return HttpRespose.badRequest(new MissingParamError('password'))
      }

      const accessToken = await this.authUseCase.auth(email, password)

      if (!accessToken) {
        return HttpRespose.unauthorizedError()
      }

      return HttpRespose.ok({ accessToken })
    } catch (error) {
      return HttpRespose.serverError()
    }
  }
}
