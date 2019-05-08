import { NextFunction, Request, Response } from 'express';

export interface IErrorMiddleware {
    run<E extends Error>(err: E, req: Request, res: Response, next: NextFunction): void;
}
