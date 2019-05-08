import { injectable } from 'inversify';

import { IReadableRepository, Predicate } from 'server/lib/mvc/repositories/types';
import { INote, Note } from 'server/models';

/* Имитация таблицы с заметками в БД */
const notes: INote[] = [
    {
        id: 1,
        userId: 1,
        text: 'Кто вы такие и почему это должно меня волновать?!'
    },
    {
        id: 2,
        userId: 2,
        text: 'Слава роботам! Убить всех человеков!'
    },
    {
        id: 3,
        userId: 2,
        text: 'Ну же, вселенная, глупая черная дыра! Отдай мне свое электричество!'
    }
];

export type INotesRepository = IReadableRepository<INote, Note>;

/*
    Декоратор injectable добавляет мета-данные к классу, фиксирует информацию
    о том, что класс может быть внедрён как зависимость в другие классы.
    Для хранения мета-информации используется глобальный объект Reflect, доступный
    благодаря пакету reflect-metadata.
*/

@injectable()
export class NotesRepository implements INotesRepository {
    findAll(predicate?: Predicate<INote>) {
        if (!predicate) {
            return notes.map(noteData => new Note(noteData));
        }

        return notes.filter(predicate).map(noteData => new Note(noteData));
    }

    findOne(predicate: Predicate<INote>) {
        const noteData = notes.find(predicate);

        if (!noteData) {
            return undefined;
        }

        return new Note(noteData);
    }
}
