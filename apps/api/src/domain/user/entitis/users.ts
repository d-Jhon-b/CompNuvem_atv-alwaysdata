
type Sexo = 'homem'|'mulher'|'outro'

interface UserPromps{
    uid:string
    nome:string
    sexo:Sexo
    idade:number
    email:string
    senha: string
}

export type user=User

export class User{

    constructor(private readonly promps:UserPromps){}
    

}