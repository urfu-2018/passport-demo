import { NotFound } from 'http-errors';

import { container, REPOSITORY_TYPES } from 'server/di';
import { BaseController } from 'server/lib/mvc/controllers/base';
import { INotesRepository, IUsersRepository } from 'server/repositories';

interface INotePath {
    noteId: string;
}

/*
    Получение инстансов репозиториев происходит через контейнер.
    Чтобы извлечь нужную реализацию, надо указать идентификатор (в нашем случае Symbol).
    Для восстановления типа нужно передать Generic параметр с интерфейсом, который реализует зависимость.
*/

export class NotesRenderController extends BaseController {
    protected usersRepo = container.get<IUsersRepository>(REPOSITORY_TYPES.Users);
    protected notesRepo = container.get<INotesRepository>(REPOSITORY_TYPES.Notes);

    async renderNotesListPage() {
        const notes = await this.notesRepo.findAll();

        this.res.render('notes-list', {
            meta: {
                charset: 'UTF-8',
                description: 'Список заметок'
            },
            page: {
                lang: 'ru',
                title: 'Список заметок'
            },
            notes
        });
    }

    async renderNotePage() {
        const { noteId }: INotePath = this.req.params;

        const note = await this.notesRepo.findOne(noteItem => noteItem.id === Number(noteId));

        if (!note) {
            throw new NotFound(`Note ${noteId} not found`);
        }

        const owner = await this.usersRepo.findOne(user => user.id === note.userId);

        this.res.render('note', {
            meta: {
                charset: 'UTF-8',
                description: `Заметка ${note.id}`
            },
            page: {
                lang: 'ru',
                title: `Заметка ${note.id}`
            },
            note,
            owner
        });
    }
}
