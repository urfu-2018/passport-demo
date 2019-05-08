import { NextFunction, Request, Response } from 'express';

export interface IMiddleware {
    run(req: Request, res: Response, next: NextFunction): void;
}
