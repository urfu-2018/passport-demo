import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

import { IErrorMiddleware } from 'server/lib/mvc/middleware/error';

type PossibleError = Error | HttpError;

export class RenderErrorHandlerMiddleware implements IErrorMiddleware {
    run(err: PossibleError, req: Request, res: Response, next: NextFunction) {
        let statusCode = 500;
        let message = 'Внутренняя ошибка сервера';

        if (err instanceof HttpError) {
            statusCode = err.statusCode;
            message = err.message;
        }

        if (statusCode >= 500) {
            console.error(err.stack);
        }

        res.status(statusCode).render('error', {
            meta: {
                charset: 'UTF-8',
                description: message
            },
            page: {
                lang: 'ru',
                title: message
            },
            statusCode,
            message
        });
    }
}
