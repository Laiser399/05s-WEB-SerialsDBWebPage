




export class LastAddedSerie {
    public idSerial: number;
    public serialName: string;
    public seasonNumber: number;
    public serieNumber: number;
    public releaseDate: Date;

    public constructor(idSerial: number, serialName: string, seasonNumber: number, 
        serieNumber: number, releaseDate: Date)
    {
        this.idSerial = idSerial;
        this.serialName = serialName;
        this.seasonNumber = seasonNumber;
        this.serieNumber = serieNumber;
        this.releaseDate = releaseDate;
    }
}