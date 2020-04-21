const HttpRespose = require('../helpers/http-reponse')
const MissingParamError = require('../helpers/missing-param-error')
const InvalidParamError = require('../helpers/invalid-param-error')

module.exports = class LoginRouter {
  constructor(authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route(httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpRespose.badRequest(new MissingParamError('email'))
      }

      if (!this.emailValidator.isValid(email)) {
        return HttpRespose.badRequest(new InvalidParamError('email'))
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
