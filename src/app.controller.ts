import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from './validation.pipe';
import { CreateHeroDto } from './create-hero.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('characters')
  getallCharacters(@Query('nameStartsWith') heroName:string ): any{
    // if got query param: "nameStartsWith" make request for super hero name 
    if(heroName){
      // console.log(heroName)
      return this.appService.getHeroByName(heroName);
    }
    return this.appService.getCharacters();
  }


  @Get('comics/:charcterID')
  getallComics(@Param('charcterID') heroID:number ): any{
    // if got query param: "charcterID" make request for super hero name 
    if(heroID){
      // console.log(heroID)
      return this.appService.getComicsByCharacter(heroID);
    }
    return this.appService.getComics();
  }

  @Post('newHero')
  addHero(@Body(new ValidationPipe()) createHeroDto: CreateHeroDto){
    return this.appService.addHero(createHeroDto);
  }
}
