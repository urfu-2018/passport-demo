import { NextFunction, Request, Response } from 'express';

export class BaseController {
    static use(action: string) {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const classInstance = new this(req, res, next);

            try {
                await classInstance[action]();
            } catch (err) {
                next(err);
            }
        };
    }

    protected req: Request;
    protected res: Response;
    protected next: NextFunction;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
}
