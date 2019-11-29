import { Serie } from "./serie";

export class Season {
    public id: number;
    public idSerial: number;
    public number: number;
    public seriesCount: number;
    public torrent: string;

    constructor(id: number, idSerial: number = undefined, number: number = undefined, 
        seriesCount: number = undefined, torrent: string = undefined)
    {
        this.id = id;
        this.idSerial = idSerial;
        this.number = number;
        this.seriesCount = seriesCount;
        this.torrent = torrent;
    }
}