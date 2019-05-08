import { injectable } from 'inversify';

import { IReadableRepository, Predicate } from 'server/lib/mvc/repositories/types';
import { IUser, User } from 'server/models';

/* Имитация таблицы с пользователями в БД */
const users: IUser[] = [
    {
        id: 1,
        username: 'fry',
        lastName: 'Фрай',
        firstName: 'Филип',
        password: '9244616fee4e28a7e26ab1b5bc877179' // qwerty
    },
    {
        id: 2,
        username: 'bender',
        lastName: 'Родригес',
        firstName: 'Бендер',
        password: '0232121a164cc13502681fb725864c6f' // 123456
    }
];

export type IUsersRepository = IReadableRepository<IUser, User>;

/*
    Декоратор injectable добавляет мета-данные к классу, фиксирует информацию
    о том, что класс может быть внедрён как зависимость в другие классы.
    Для хранения мета-информации используется глобальный объект Reflect, доступный
    благодаря пакету reflect-metadata.
*/

@injectable()
export class UsersRepository implements IUsersRepository {
    findAll(predicate?: Predicate<IUser>) {
        if (!predicate) {
            return users.map(userData => new User(userData));
        }

        return users.filter(predicate).map(userData => new User(userData));
    }

    findOne(predicate: Predicate<IUser>) {
        const userData = users.find(predicate);

        if (!userData) {
            return undefined;
        }

        return new User(userData);
    }
}
