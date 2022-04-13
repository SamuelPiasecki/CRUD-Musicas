export class Musica {
    id?: string
    nome:string
    album:string
    cantor:string
    produtor:string
    genero:string
    ano:string
    disponivel:string
    imageName?:string
    downloadURL?:string

    constructor(nome:string, album:string, cantor:string, produtor:string,
        genero:string, ano:string, disponivel:string){
            this.nome = nome
            this.album = album
            this.cantor = cantor
            this.produtor = produtor
            this.genero = genero
            this.ano = ano
            this.disponivel = disponivel
        }

}
