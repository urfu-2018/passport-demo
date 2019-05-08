import express, { Router } from 'express';
import { NotFound } from 'http-errors';

import {
    LoginRenderController,
    NotesRenderController,
    UsersRenderController
} from 'server/controllers';
import { passport } from 'server/lib/passport/init';
import { EnsureAuthMiddleware, RenderErrorHandlerMiddleware } from 'server/middlewares';

const router = Router();

/* Редиректим с главной на /notes */
router.get('/', (req, res) => res.redirect('/notes'));

/*
    По пути /login на GET запрос возвращается страница с формой входа,
    а POST обрабатывается Passport'ом. Перед передачей управления в Passport,
    производится декодирование тела запроса в формате application/x-www-form-urlencoded.
    Аутентификация производится по стратегии local, в случае успеха происходит редирект на
    корень, а в противном случае пользователь возвращается на /login.
*/
router
    .route('/login')
    .get(LoginRenderController.use('renderLoginPage'))
    .post(
        express.urlencoded({ extended: true }),
        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
    );

/*
    Страница /profile закрытая, на неё нельзя попасть неавторизованному пользователю.
    EnsureAuthMiddleware производит редирект на страницу /login если пользователь не
    прошёл процесс аутентификации.
*/
router.get(
    '/profile',
    [new EnsureAuthMiddleware().run],
    UsersRenderController.use('renderProfilePage')
);

/*
    Страницы /notes и /notes/:noteId открытые, их можно
    просматривать неавторизованным пользователям
*/
router.get('/notes', NotesRenderController.use('renderNotesListPage'));
router.get('/notes/:noteId', NotesRenderController.use('renderNotePage'));

/*
    Если переданный пользователем URL не совпадает с шаблонами,
    то бросаем ошибку 404, которую подхватит RenderErrorHandlerMiddleware.
*/
router.all('*', () => {
    throw new NotFound('Page not found');
});
/*
    Глобальный обработчик ошибок. Если случается исключение в какой-то
    middleware или в контроллере, то оно будет поймано этим обработчиком.
*/
router.use(new RenderErrorHandlerMiddleware().run);

export { router };
