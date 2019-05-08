import { encryptPassword } from 'server/lib/crypto/passwords';

export interface IUser {
    id: number;
    lastName: string;
    firstName: string;
    username: string;
    password: string;
}

export class User implements IUser {
    id: number;
    lastName: string;
    firstName: string;
    username: string;
    password: string;

    constructor(userData: IUser) {
        this.id = userData.id;
        this.lastName = userData.lastName;
        this.firstName = userData.firstName;
        this.username = userData.username;
        this.password = userData.password;
    }

    get displayName() {
        return `${this.lastName} ${this.firstName}`;
    }

    checkPassword(password: string, salt: string) {
        return this.password === encryptPassword(password, salt);
    }
}
