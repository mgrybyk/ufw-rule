import { Request, NextFunction, Response } from 'express'

import httpStatus from 'http-status'
import { logger } from '../config/logger'
import { ApiError } from '../error'

export const errorConverter = (
    err: { statusCode?: number; message?: string; stack?: string },
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = err
    if (!(error instanceof ApiError)) {
        const statusCode: number = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        const message = error.message || httpStatus[statusCode.toString() as keyof httpStatus.HttpStatus]

        error = new ApiError(statusCode, message as string, false, err.stack)
    }
    next(error)
}

export const errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    const { statusCode: code, message } = err

    res.locals.errorMessage = err.message

    const response = { code, message }
    if (code !== httpStatus.NOT_FOUND) {
        logger.error(err)
    }

    res.status(code).send(response)
}
