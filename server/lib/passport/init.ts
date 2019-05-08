import passport from 'passport';
import passportLocal from 'passport-local';

import { container, SERIALIZATION_TYPES } from 'server/di';
import { IUserDeserializer, IUserSerializer } from 'server/lib/passport/types';
import { LocalStrategyVerifier } from 'server/lib/passport/verification';

const LocalStrategy = passportLocal.Strategy;
const serializer = container.get<IUserSerializer>(SERIALIZATION_TYPES.UserSerializer);
const deserializer = container.get<IUserDeserializer>(SERIALIZATION_TYPES.UserDeserializer);

/*
    Регистрируем сериалайзер и десериалайзер, чтобы Passport использовал их
*/
passport.serializeUser(serializer.serialize);
passport.deserializeUser(deserializer.deserialize);

/*
    Регистрируем стратегии.
    На данный момент только одну для аутентификации по логину и паролю.
*/
passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        new LocalStrategyVerifier().verify
    )
);

export { passport };
