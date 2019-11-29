import mysql = require("mysql2");
import { GenresContainer } from "./containers/genres_container";
import { SerialsContainer } from "./containers/serials_container";
import { SeasonsContainer } from "./containers/seasons_container";
import { SeriesContainer } from "./containers/series_container";
import { Serial } from "./records/serial";
import { Season } from "./records/season";
import { Serie } from "./records/serie";
import { Genre } from "./records/genre";

export class Database {
    private host: string = "localhost";
    private user: string = "web-server";
    private password: string = "i5mHB03h_ewep_8S";
    private database: string = "serials_cw";
    private connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database
    });

    private lastChangeId: number = 0;
    private lastStgChangeId: number = 0;
    private genres: GenresContainer = new GenresContainer();
    private serials: SerialsContainer = new SerialsContainer();
    private seasons: SeasonsContainer = new SeasonsContainer();
    private series: SeriesContainer = new SeriesContainer();

    constructor() {
        this.connection.connect((err) => {
            if (err) {
                console.log(`Error connect to database: ${err}`);
            }
        });

        this.initLastChangeId();
        this.checkChanges = this.checkChanges.bind(this);
        setInterval(this.checkChanges, 1000);

        this.initGenres();
        this.initSerials();
        this.initSeasons();
        this.initSeries();
    }

    private checkChanges() {
        this.checkMainChanges();
        this.checkStgChanges();
    }

    private checkMainChanges() {
        this.connection.execute(`CALL get_changes_after(${this.lastChangeId});`, (err, res) => {
            if (err) {
                console.log(`Error receive changes after id ${this.lastChangeId}: ${err}`);
                return;
            }

            res[0].forEach(row => {
                switch (row.table_name) {
                    case "genre":
                        this.applyGenreChange(row.id_row);
                        break;
                    case "serial":
                        this.applySerialChange(row.id_row);
                        break;
                    case "season":
                        this.applySeasonChange(row.id_row);
                        break;
                    case "series":
                        this.applySerieChange(row.id_row);
                        break;
                }
                this.lastChangeId = row.id;
            });
            
        });
    }

    private checkStgChanges() {
        this.connection.execute(`CALL get_stg_changes_after(${this.lastStgChangeId});`, (err, res) => {
            if (err) {
                console.log(`Error receive stg changes after id ${this.lastStgChangeId}: ${err}.`);
                return;
            }

            res[0].forEach(row => {
                let serial = this.serials.getSerial(row.id_serial);
                switch (row.type) {
                    case "insert":
                        let genre = this.genres.getGenre(row.id_genre);
                        serial.addGenre(genre);
                        break;
                    case "delete":
                        serial.removeGenreById(row.id_genre);
                        break;
                }
                this.lastStgChangeId = row.id;
            });
        });
    }

    private applyGenreChange(id: number): void {
        this.connection.execute(`CALL get_genre_by_id(${id});`, (err, res) => {
            if (err) {
                console.log(`Error receive genre with id ${id}: ${err}.`);
                return;
            }

            if (res[0].length === 0) {
                this.genres.removeById(id);
                this.serials.getSerials().forEach(serial => serial.removeGenreById(id));
            }
            else {
                let name: string = res[0][0].name;
                this.genres.addOrUpdate(id, name);
            }
        });
    }

    private applySerialChange(id: number): void {
        this.connection.execute(`CALL get_serial_by_id(${id});`, (err, res) => {
            if (err) {
                console.log(`Error receive serial with id ${id}: ${err}.`);
                return;
            }

            if (res[0].length === 0) {
                this.serials.removeById(id);
            }
            else {
                let name: string = res[0][0].name;
                let officialSite: string = res[0][0].official_site;
                let mark: number = res[0][0].mark;
                this.serials.addOrUpdate(id, name, officialSite, mark);
            }
        });
    }

    private applySeasonChange(id: number): void {
        this.connection.execute(`CALL get_season_by_id(${id});`, (err, res) => {
            if (err) {
                console.log(`Error receive season with id ${id}: ${err}.`);
                return;
            }

            if (res[0].length === 0) {
                this.seasons.removeById(id);
            }
            else {
                let idSerial: number = res[0][0].id_serial;
                let number: number = res[0][0].number;
                let seriesCount: number = res[0][0].series_count;
                let torrent: string = res[0][0].torrent_link;
                this.seasons.addOrUpdate(id, idSerial, number, seriesCount, torrent);
            }
        });
    }

    private applySerieChange(id: number): void {
        this.connection.execute(`CALL get_series_by_id(${id});`, (err, res) => {
            if (err) {
                console.log(`Error receive serie with id ${id}: ${err}.`);
                return;
            }

            if (res[0].length === 0) {
                this.series.removeById(id);
            }
            else {
                let idSeason: number = res[0][0].id_season;
                let number: number = res[0][0].number;
                let name: string = res[0][0].name;
                let releaseDate: Date = res[0][0].release_date;
                let torrent: string = res[0][0].torrent_link;
                this.series.addOrUpdate(id, idSeason, number, name, releaseDate, torrent);
            }
        });
    }

    private initLastChangeId() {
        this.connection.execute("CALL get_last_change_ids();", (err, res) => {
            if (err) {
                console.log(`Error receive change ids: ${err}`);
                return;
            }
            this.lastChangeId = res[0][0].id_main;
            this.lastStgChangeId = res[0][0].id_stg;
        });
    }

    private initGenres(): void {
        this.connection.execute("CALL get_all_genres();", (err, res) => {
            if (err) {
                console.log(`Error receive genres from db: ${err}`);
                return;
            }
            res[0].forEach(row => {
                this.genres.addOrUpdate(row.id, row.name);
            });
        });
    }

    private initSerials(): void {
        this.connection.execute("CALL get_all_serials();", (err, res) => {
            if (err) {
                console.log(`Error receive serials from db: ${err}`);
                return;
            }
            res[0].forEach(row => {
                this.serials.addOrUpdate(row.id, row.name, row.official_site, row.mark);
                this.initGenresForSerial(row.id);
            });
        });
    }

    private initSeasons(): void {
        this.connection.execute("CALL get_all_seasons();", (err, res) => {
            if (err) {
                console.log(`Error receive seasons from db: ${err}`);
                return;
            }
            res[0].forEach(row => {
                this.seasons.addOrUpdate(row.id, row.id_serial, row.number, row.series_count, 
                    row.torrent_link);
            });
        });
    }

    private initSeries(): void {
        this.connection.execute("CALL get_all_series();", (err, res) => {
            if (err) {
                console.log(`Error receive series from db: ${err}`);
                return;
            }

            res[0].forEach(row => {
               this.series.addOrUpdate(row.id, row.id_season, row.number, row.name,
                    row.release_date, row.torrent_link);
            });
        });
    }

    private initGenresForSerial(idSerial: number): void {
        this.connection.execute(`CALL get_genres_id_for(${idSerial});`, (err, res) => {
            if (err) {
                console.log(`Error receive genres for serial with id ${idSerial}: ${err}`);
                return;
            }
            let serial: Serial = this.serials.getSerial(idSerial);
            res[0].forEach(row => {
                let genre: Genre = this.genres.getGenre(row.id_genre);
                serial.addGenre(genre);
            });
        });
    }

    public isExistsSerial(id: number): boolean {
        return this.serials.isExists(id);
    }

    public isExistsSeason(id: number): boolean {
        return this.seasons.isExists(id);
    }

    public getSerials(): Array<Serial> {
        return this.serials.getSerials();
    }

    public getSeasons(idSerial: number): Set<Season> {
        return this.seasons.getSeasons(idSerial);
    }

    public getSeries(idSeason: number): Set<Serie> {
        return this.series.getSeries(idSeason);
    }


}