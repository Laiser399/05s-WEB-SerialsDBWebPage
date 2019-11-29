
export class Genre {
    public id: number;
    public name: string;

    constructor(id: number, name: string = undefined) {
        this.id = id;
        this.name = name;
    }
}