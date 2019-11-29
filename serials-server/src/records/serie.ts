

export class Serie {
    public id: number;
    public idSeason: number;
    public number: number;
    public name: string;
    public releaseDate: Date;
    public torrent: string;

    constructor(id: number, idSeason: number = undefined, number: number = undefined,
        name: string = undefined, releaseDate: Date = undefined, torrent: string = undefined)
    {
        this.id = id;
        this.idSeason = idSeason;
        this.number = number;
        this.name = name;
        this.releaseDate = releaseDate;
        this.torrent = torrent;
    }
}