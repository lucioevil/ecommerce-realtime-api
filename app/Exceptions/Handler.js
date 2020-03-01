'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Logger = use('Logger') // classe responsavel por gerar o logger no arquivo de texto

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
    /**
     * Handle exception thrown during the HTTP lifecycle
     *
     * @method handle
     *
     * @param  {Object} error
     * @param  {Object} options.request
     * @param  {Object} options.response
     *
     * @return {void}
     */
    async handle(error, {
        request,
        response
    }) {
        response.status(error.status).send(error.message)
    }

    /**
     * Report exception for logging or debugging.
     *
     * @method report
     *
     * @param  {Object} error
     * @param  {Object} options.request
     *
     * @return {void}
     */
    async report(error, {
        request
    }) {
        // reporta os erros acima de 500
        if (error.status >= 500) {
            Logger.error(error.message, {
                stack: error.stack,
                message: error.message,
                status: error.status,
                name: error.name
            })
        }
    }
}

module.exports = ExceptionHandler