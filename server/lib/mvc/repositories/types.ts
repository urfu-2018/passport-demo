export type Predicate<E> = (entity: E) => boolean;

export interface IReadableRepository<E, M extends E> {
    findAll(predicate?: Predicate<E>): M[];
    findOne(predicate: Predicate<E>): M | undefined;
}

export interface IWritableRepository<T> {
    create(entity: T): void;
    update(entity: T): void;
    delete(entity: T): void;
}
