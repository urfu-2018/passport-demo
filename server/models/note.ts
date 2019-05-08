export interface INote {
    id: number;
    userId: number;
    text: string;
}

export class Note implements INote {
    id: number;
    userId: number;
    text: string;

    constructor(noteData: INote) {
        this.id = noteData.id;
        this.userId = noteData.userId;
        this.text = noteData.text;
    }
}
