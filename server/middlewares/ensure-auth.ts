import { NextFunction, Request, Response } from 'express';

import { IMiddleware } from 'server/lib/mvc/middleware/base';

export class EnsureAuthMiddleware implements IMiddleware {
    run(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');
    }
}
