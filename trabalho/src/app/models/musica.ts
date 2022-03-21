export class Musica {
    id?: string
    nome:string
    album:string
    cantor:string
    produtor:string
    genero:string
    ano:number
    disponivel:string

    constructor(nome:string, album:string, cantor:string, produtor:string,
        genero:string, ano:number, disponivel:string){
            this.nome = nome
            this.album = album
            this.cantor = cantor
            this.produtor = produtor
            this.genero = genero
            this.ano = ano
            this.disponivel = disponivel
        }

}
