export class Musica {
    private _nome:string
    private _album:string
    private _cantor:string
    private _produtor:string
    private _genero:string
    private _ano:number
    private _disponivel:string

    constructor(nome:string, album:string, cantor:string, produtor:string,
        genero:string, ano:number, disponivel:string){
            this._nome = nome
            this._album = album
            this._cantor = cantor
            this._produtor = produtor
            this._genero = genero
            this._ano = ano
            this._disponivel = disponivel
        }

        public getNome():string{
            return this._nome
        }

        public setNome(nome:string):void{
            this._nome = nome
        }

        public getAlbum():string{
            return this._album
        }

        public setAlbum(album:string):void{
            this._album = album
        }

        public getCantor():string{
            return this._cantor
        }

        public setCantor(cantor:string):void{
            this._cantor = cantor
        }

        public getProdutor():string{
            return this._produtor
        }

        public setProdutor(produtor:string):void{
            this._produtor = produtor
        }

        public getGenero():string{
            return this._genero
        }

        public setGenero(genero:string):void{
            this._genero = genero
        }

        public getAno():number{
            return this._ano
        }

        public setAno(ano:number):void{
            this._ano = ano
        }

        public getDisponivel():string{
            return this._disponivel
        }

        public setDisponivel(disponivel:string):void{
            this._disponivel = disponivel
        }
}
