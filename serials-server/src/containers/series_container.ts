import { Serie } from "../records/serie";

export class SeriesContainer {
    private serieById: Map<number, Serie> = new Map();
    private seriesByIdSeason: Map<number, Set<Serie> > = new Map();

    public addOrUpdate(id: number, idSeason: number, number: number, name: string, 
        releaseDate: Date, torrent: string): Serie
    {
        let serie: Serie = this.serieById.get(id);
        if (serie) {
            this.removeFromSeriesSet(serie);
            serie.idSeason = idSeason;
            this.addToSeriesSet(serie);

            serie.number = number;
            serie.name = name;
            serie.releaseDate = releaseDate;
            serie.torrent = torrent;
            return serie;
        }
        else {
            serie = new Serie(id, idSeason, number, name, releaseDate, torrent);
            this.add(serie);
            return serie;
        }
    }

    public getSerie(id: number): Serie {
        let serie: Serie = this.serieById.get(id);
        if (!serie) {
            serie = new Serie(id);
            this.add(serie);
        }
        return serie;
    }

    public getSeries(idSeason: number): Set<Serie> {
        let series: Set<Serie> = this.seriesByIdSeason.get(idSeason);
        if (!series) {
            series = new Set();
            this.seriesByIdSeason.set(idSeason, series);
        }
        return series;
    }

    private add(serie: Serie): void {
        this.serieById.set(serie.id, serie);
        this.addToSeriesSet(serie);
    }

    public removeById(id: number): Serie {
        let serie: Serie = this.serieById.get(id);
        this.serieById.delete(id);
        if (serie) this.removeFromSeriesSet(serie);
        return serie;
    }

    private removeFromSeriesSet(serie: Serie): void {
        let series: Set<Serie> = this.seriesByIdSeason.get(serie.idSeason);
        if (series) {
            series.delete(serie);
        }
    }

    private addToSeriesSet(serie: Serie): void {
        let series: Set<Serie> = this.seriesByIdSeason.get(serie.idSeason);
        if (!series) {
            series = new Set();
            this.seriesByIdSeason.set(serie.idSeason, series);
        }
        series.add(serie);
    }

}