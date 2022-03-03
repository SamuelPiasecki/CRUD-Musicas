import { Component } from '@angular/core';
import { Musica } from './models/musica';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public lista_musicas:Musica[] = []
  public nome:string | undefined
  public album:string | undefined
  public cantor:string | undefined
  public produtor:string | undefined
  public genero:string | undefined
  public ano:number | undefined
  public disponivel:string | undefined
  public index:number = -1
  public edicao:boolean = false

  

  public salvar():void{
    if(!this.nome){
      alert("Nome é obrigatório!")
      return
    }

    if(!this.album){
      alert("Álbum é obrigatório!")
      return
    }

    if(!this.cantor){
      alert("Cantor é obrigatório!")
      return
    }

    if(!this.produtor){
      alert("Produtor é obrigatório!")
      return
    }

    if(!this.genero){
      alert("Gênero é obrigatório!")
      return
    }

    if(!this.ano){
      alert("Ano de lançamento é obrigatório!")
      return
    }

    if(this.ano.toString().length != 4){
      alert("Ano inválido")
      return
    }

    if(!this.disponivel){
      alert("Disponível em é obrigatório!")
      return
    }

    if(this.index == -1){

      let musica = new Musica(this.nome, this.album, this.cantor, this.produtor, 
        this.genero, this.ano, this.disponivel)
      this.lista_musicas.push(musica)
      alert("Música Adicionada a lista!");
    }else{
      this.lista_musicas[this.index].setNome(this.nome)
      this.lista_musicas[this.index].setAlbum(this.album)
      this.lista_musicas[this.index].setCantor(this.cantor)
      this.lista_musicas[this.index].setProdutor(this.produtor)
      this.lista_musicas[this.index].setGenero(this.genero)
      this.lista_musicas[this.index].setAno(this.ano)
      this.lista_musicas[this.index].setDisponivel(this.disponivel)
    }

    this.nome = undefined
    this.album = undefined
    this.cantor = undefined
    this.produtor = undefined
    this.genero = undefined
    this.ano = undefined
    this.disponivel = undefined
    this.edicao = false
  }

  public excluir(index:number):void{
    this.lista_musicas.splice(index,1)
    alert("Música excluída")
  }

  public editar(index:number):void{
    this.edicao = true
    this.index = index
    this.nome = this.lista_musicas[index].getNome()
    this.album = this.lista_musicas[index].getAlbum()
    this.cantor = this.lista_musicas[index].getCantor()
    this.produtor = this.lista_musicas[index].getProdutor()
    this.genero = this.lista_musicas[index].getGenero()
    this.ano = this.lista_musicas[index].getAno()
    this.disponivel = this.lista_musicas[index].getDisponivel()
    
  }
}
