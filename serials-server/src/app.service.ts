import { Injectable } from '@nestjs/common';
import { Database } from "./database";
import { Serial } from "./records/serial";
import { Season } from "./records/season";
import { Serie } from "./records/serie";

@Injectable()
export class AppService {
  private database: Database = new Database();

  constructor() {
    
  }

  public getSerials(): Array<Serial> {
    return this.database.getSerials();
  }

  public getSeasons(idSerial: number): Array<Season> {
    if (this.database.isExistsSerial(idSerial)) {
      return Array.from(this.database.getSeasons(idSerial));
    }
    else {
      return [];
    }
  }

  public getSeries(idSeason: number): Array<Serie> {
    if (this.database.isExistsSeason(idSeason)) {
      return Array.from(this.database.getSeries(idSeason));
    }
    else {
      return [];
    }
  }
}
