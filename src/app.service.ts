import { Injectable, HttpService, HttpException } from '@nestjs/common';
import {Md5} from 'ts-md5/dist/md5';


import { CreateHeroDto } from './create-hero.dto';
import { response } from 'express';


@Injectable()
export class AppService {

  apiUrl = 'http://gateway.marvel.com/v1/public/'
  
  ts:string = ''
  privateKey:string = ''
  apiKey:string = ''
  hash:string = ''

  response = null
  data = null

  credentials = ''



  constructor(private http: HttpService){
    const md5 = new Md5();
    this.ts = Date.now().toString()

    this.apiUrl = 'http://gateway.marvel.com/v1/public'

    this.apiKey = 'PUBLIC KEY'
  
    this.privateKey = 'PRIVATE KEY'
    
    this.hash = md5.appendStr(this.ts+this.privateKey+this.apiKey).end().toString()
    // console.log(this.hash);

    this.credentials = `ts=${this.ts}&apikey=${this.apiKey}&hash=${this.hash}`
    
  }


  getHello(): string {
    return 'Hello World!';
  }

  getComics(){
    return [];
  }

  getComicsByCharacter(characterID: number ){

  }

  async getCharacters(){  
    try {
      this.response = await this.http.get(`${this.apiUrl}/characters?${this.credentials}`,{withCredentials:true})
      .toPromise()
      this.data = await this.response.data.data      
    } catch (error) {
      throw new HttpException(error.response.data, 409)
    }

    // console.log(this.data)
    return this.data.results;

  }


  async getHeroByName(heroname: string){
    console.log(`${this.apiUrl}/characters?nameStartsWith=${heroname}&${this.credentials}`);
  
    try {
      this.response = await this.http.get(`${this.apiUrl}/characters?nameStartsWith=${heroname}&${this.credentials}`,{withCredentials:true})
      .toPromise()
      this.data = await this.response   
    } catch (error) {
      throw new HttpException(error.response.data, 409)
    }

    // console.log(this.data.results)
    return this.response.data;

  }



  addHero(hero : CreateHeroDto){
    return [hero];
  }

}
