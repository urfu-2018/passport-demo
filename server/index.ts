import path from 'path';

// Полифилл, добавляющий возможность записи и чтения метаданных к функциям и классам
// Требуется для корректной работы InversifyJS
import 'reflect-metadata';

import express from 'express';
import expressSession from 'express-session';

import { config } from 'server/config';
import { passport } from 'server/lib/passport/init';
import { router } from 'server/router';

const app = express();

/*
    express-session — middleware для работы с пользовательскими сессиями (https://github.com/expressjs/session)

    Сессии позволяют идентифицировать разных пользователей и хранить данные на каждого пользователя
    в рамках его сессии. express-session не хранит данные в cookie (в них только id сессии), а
    делает это на стороне сервера. По умолчанию express-session использует хранилище в
    памяти (MemoryStore), оно не пригодно для production потому что подвержено утечкам памяти и
    теряет своё состояние после перезапуска сервера.
*/
app.use(
    expressSession({
        secret: config.secret,
        resave: false,
        saveUninitialized: false
    })
);
/*
    PassportJS — это Middleware для аутентификации под NodeJS. Он поддерживает более 500 различных
    стратегий аутентификации. Стратегии определяют способ аутентификации, например, passport-local
    позволяет аутентифицировать пользователя по логину и паролю.
*/

/*
    passport.initialize() — Middleware, которая заполняет объект req._passport,
    он требуется библиотеке для корректной работы.
*/
app.use(passport.initialize());
/*
    Если используются пользовательские сессии, то passport.session() позволяет
    "десериализовать" объект пользователя в req.user исходя из знания id его сессии.
*/
app.use(passport.session());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(router);

app.listen(config.server.port, () => {
    console.info(`Server started on http://localhost:${config.server.port}`);
});
