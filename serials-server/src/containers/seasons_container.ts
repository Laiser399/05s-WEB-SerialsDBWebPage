import { Season } from "../records/season";

export class SeasonsContainer {
    private seasonById: Map<number, Season> = new Map();
    private seasonsByIdSerial: Map<number, Set<Season> > = new Map();

    public addOrUpdate(id: number, idSerial: number, number: number, seriesCount: number, 
        torrent: string): Season
    {
        let season: Season = this.seasonById.get(id);
        if (season) {
            this.removeFromSeasonsSet(season);
            season.idSerial = idSerial;
            this.addToSeasonsSet(season);

            season.number = number;
            season.seriesCount = seriesCount;
            season.torrent = torrent;
            return season;
        }
        else {
            season = new Season(id, idSerial, number, seriesCount, torrent);
            this.add(season);
            return season;
        }
    }

    public getSeason(id: number): Season {
        let season: Season = this.seasonById.get(id);
        if (!season) {
            season = new Season(id);
            this.add(season);
        }
        return season;
    }

    public getSeasons(idSerial: number): Set<Season> {
        let seasons: Set<Season> = this.seasonsByIdSerial.get(idSerial);
        if (seasons === undefined) {
            seasons = new Set();
            this.seasonsByIdSerial.set(idSerial, seasons);
        }
        return seasons;
    }

    private add(season: Season): void {
        this.seasonById.set(season.id, season);
        this.addToSeasonsSet(season);
    }

    public removeById(id: number): Season {
        let season: Season = this.seasonById.get(id);
        this.seasonById.delete(id);
        if (season) this.removeFromSeasonsSet(season);
        return season;
    }

    public isExists(id: number): boolean {
        return this.seasonById.get(id) ? true : false;
    }

    private removeFromSeasonsSet(season: Season): void {
        let seasons: Set<Season> = this.seasonsByIdSerial.get(season.idSerial);
        if (seasons) {
            seasons.delete(season);
        }
    }

    private addToSeasonsSet(season: Season): void {
        let seasons: Set<Season> = this.seasonsByIdSerial.get(season.idSerial);
        if (!seasons) {
            seasons = new Set();
            this.seasonsByIdSerial.set(season.idSerial, seasons);
        }
        seasons.add(season);
    }
}