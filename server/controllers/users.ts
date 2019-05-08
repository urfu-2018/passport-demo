import { BaseController } from 'server/lib/mvc/controllers/base';

export class UsersRenderController extends BaseController {
    renderProfilePage() {
        this.res.render('profile', {
            meta: {
                charset: 'UTF-8',
                description: 'Профиль пользователя'
            },
            page: {
                lang: 'ru',
                title: 'Профиль пользователя'
            },
            user: this.req.user
        });
    }
}
