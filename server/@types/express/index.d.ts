import 'express';

import { User } from 'server/models';

declare module 'express' {
    interface Request {
        user?: User;
    }
}
