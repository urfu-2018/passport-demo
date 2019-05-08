import { injectable } from 'inversify';

import { container, REPOSITORY_TYPES } from 'server/di';
import { IUserDeserializer, IUserSerializer } from 'server/lib/passport/types';
import { User } from 'server/models';
import { IUsersRepository } from 'server/repositories';

/*
    Метод serialize говорит Passport'у какой идентификатор будет использоваться в session ID куке
*/
@injectable()
export class UserSerializer implements IUserSerializer {
    serialize(user: User, done: (err?: Error, id?: number) => void) {
        done(undefined, user.id);
    }
}

/*
    Метод deserialize используется в passport.session() middleware для получения объекта
    пользователя по значению его куки session ID
*/
@injectable()
export class UserDeserializer implements IUserDeserializer {
    protected usersRepo = container.get<IUsersRepository>(REPOSITORY_TYPES.Users);

    constructor() {
        this.deserialize = this.deserialize.bind(this);
    }

    async deserialize(id: number, done: (err?: Error, user?: User) => void) {
        try {
            done(undefined, await this.usersRepo.findOne(user => user.id === id));
        } catch (err) {
            done(err, undefined);
        }
    }
}
