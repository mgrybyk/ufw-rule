import { app } from './app'
import config from './config/config'
import { logger } from './config/logger'

logger.info(`Running in '${config.env}' mode`)

const server = app.listen(config.port, config.serverHost, () => {
    logger.info(`Listening to port ${config.serverHost}:${config.port}`)
})

const unexpectedErrorHandler = (error: Error) => {
    logger.error(error)
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
    logger.info('SIGTERM received')
    if (server) {
        server.close()
    }
})
