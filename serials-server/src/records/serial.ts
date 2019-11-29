import { Season } from "./season";
import { Genre } from "./genre";

export class Serial {
    public id: number;
    public name: string;
    public official_site: string;
    public mark: number;
    public genres: Array<Genre> = new Array();

    constructor(id: number, name: string = undefined, official_site: string = undefined, 
        mark: number = undefined)
    {
        this.id = id;
        this.name = name;
        this.official_site = official_site;
        this.mark = mark;
    }

    public addGenre(genre: Genre): void {
        this.genres.push(genre);
    }

    public removeGenreById(id: number): void {
        this. genres = this.genres.filter(genre => genre.id != id);
    }

}