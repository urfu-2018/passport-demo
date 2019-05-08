import { User } from 'server/models';

export interface IUserSerializer {
    serialize(user: User, done: (err?: Error, id?: number) => void): void;
}

export interface IUserDeserializer {
    deserialize(id: number, done: (err?: Error, user?: User) => void): void;
}
