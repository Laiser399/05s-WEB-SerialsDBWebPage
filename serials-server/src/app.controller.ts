import { Controller, Get, Res, HttpStatus, Header, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/api/get-serials")
  getSerials(@Res() res) {
    res.status(HttpStatus.OK).json(this.appService.getSerials());
  }

  @Get("/api/get-seasons/:idSerial")
  getSeasons(@Res() res, @Param("idSerial") idSerial) {
    res.status(HttpStatus.OK).json(this.appService.getSeasons(+idSerial));
  }
  
  @Get("/api/get-series/:idSeason")
  getSeries(@Res() res, @Param("idSeason") idSeason) {
    res.status(HttpStatus.OK).json(this.appService.getSeries(+idSeason));
  }

  @Get("/api/get-last-added-series")
  getLastAddedSeries(@Res() res) {
    res.status(HttpStatus.OK).json(this.appService.getLastAddedSeries());
  }

  @Get("/test")
  test(@Res() res) {
    res.set("aga", "zdoh?");
    res.send("q");
  }

  
}
