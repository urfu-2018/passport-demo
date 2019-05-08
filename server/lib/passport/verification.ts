import { IVerifyOptions } from 'passport-local';

import { config } from 'server/config';
import { container, REPOSITORY_TYPES } from 'server/di';
import { User } from 'server/models';
import { IUsersRepository } from 'server/repositories';

export class LocalStrategyVerifier {
    protected usersRepo = container.get<IUsersRepository>(REPOSITORY_TYPES.Users);

    constructor() {
        this.verify = this.verify.bind(this);
    }

    async verify(
        username: string,
        password: string,
        done: (error?: Error, user?: User, options?: IVerifyOptions) => void
    ) {
        let user: User | undefined;

        try {
            user = this.usersRepo.findOne(u => u.username === username);
        } catch (err) {
            return done(err);
        }

        if (!user) {
            return done(undefined, undefined, { message: `Username ${username} not found` });
        }

        if (user.checkPassword(password, config.secret)) {
            return done(undefined, user);
        } else {
            done(undefined, undefined, { message: 'Invalid username or password.' });
        }
    }
}
