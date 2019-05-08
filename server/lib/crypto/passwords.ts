import crypto from 'crypto';

export function encryptPassword(password: string, salt: string) {
    return crypto
        .createHash('md5')
        .update(password + salt)
        .digest('hex');
}
