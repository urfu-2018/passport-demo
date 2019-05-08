import { Container } from 'inversify';

import { REPOSITORY_TYPES, SERIALIZATION_TYPES } from 'server/di/types';
import { UserDeserializer, UserSerializer } from 'server/lib/passport/serialization';
import { IUserDeserializer, IUserSerializer } from 'server/lib/passport/types';
import {
    INotesRepository,
    IUsersRepository,
    NotesRepository,
    UsersRepository
} from 'server/repositories';

/*
    Инициализируем IoC контейнер в который можно регистрировать реализации
    тех или иных зависимостей, а также получать их из произвольного места программы.
 */
export const container = new Container();

/* Регистрируем конкретные реализации IUsersRepository и INotesRepository */
container.bind<IUsersRepository>(REPOSITORY_TYPES.Users).to(UsersRepository);
container.bind<INotesRepository>(REPOSITORY_TYPES.Notes).to(NotesRepository);

/* А также сериализатор и десериализатор пользователя */
container.bind<IUserSerializer>(SERIALIZATION_TYPES.UserSerializer).to(UserSerializer);
container.bind<IUserDeserializer>(SERIALIZATION_TYPES.UserDeserializer).to(UserDeserializer);
