import { Genre } from "../records/genre";


export class GenresContainer {
    private genreById: Map<number, Genre> = new Map();
    private genres: Array<Genre> = new Array();

    public addOrUpdate(id: number, name: string): void {
        let genre: Genre = this.genreById.get(id);
        if (genre) {
            genre.name = name;
        }
        else {
            this.add(new Genre(id, name));
        }
    }

    public getGenre(id: number): Genre {
        let genre: Genre = this.genreById.get(id);
        if (!genre) {
            genre = new Genre(id);
            this.add(genre);
        }
        return genre;
    }

    public getGenres(): Array<Genre> {
        return this.genres;
    }

    private add(genre: Genre): void {
        this.genreById.set(genre.id, genre);
        this.genres.push(genre);
    }

    public removeById(id: number): Genre {
        let genre: Genre = this.genreById.get(id);
        this.genreById.delete(id);
        let index = this.genres.indexOf(genre);
        if (index >= 0) this.genres.splice(index, 1);
        return genre;
    }

}