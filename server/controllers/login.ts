import { BaseController } from 'server/lib/mvc/controllers/base';

export class LoginRenderController extends BaseController {
    renderLoginPage() {
        this.res.render('login', {
            meta: {
                charset: 'UTF-8',
                description: 'Страница входа'
            },
            page: {
                lang: 'ru',
                title: 'Страница входа'
            }
        });
    }
}
