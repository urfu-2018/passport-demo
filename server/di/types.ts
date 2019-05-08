/*
    После компиляции TypeScript интерфейсы прекращают существование, поэтому
    для идентификации зависимостей в рантайме рекомендуется использовать Symbol.
*/
export const REPOSITORY_TYPES = {
    Users: Symbol.for('UsersRepository'),
    Notes: Symbol.for('NotesRepository')
};

export const SERIALIZATION_TYPES = {
    UserSerializer: Symbol.for('UserSerializer'),
    UserDeserializer: Symbol.for('UserDeserializer')
};
