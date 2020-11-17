import { IsString, IsInt, IsUrl } from "class-validator"

export class CreateHeroDto {
    
    // @IsString()
    name: string

    @IsInt()
    speed: number

    @IsUrl()
    url: string

    
}
