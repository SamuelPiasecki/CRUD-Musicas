import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Musica } from 'src/app/models/musica';
import { MusicasService } from 'src/app/services/musicas.service';

@Component({
  selector: 'app-lista-de-musicas',
  templateUrl: './lista-de-musicas.component.html',
  styleUrls: ['./lista-de-musicas.component.scss']
})
export class ListaDeMusicasComponent implements OnInit {

  lista_musicas:Musica[] = []

  constructor(private _router:Router, private _musicaService:MusicasService) { }

  ngOnInit(): void {
    this.lista_musicas = this._musicaService.getMusicas()
  }

  public excluir(index:number):void{
    let resultado = confirm("Deseja excluir a Música da Lista: " + this._musicaService.getMusica(index).getNome() + "?")
    if(resultado){
      if(this._musicaService.excluirMusica(index)){
        alert("Música excluída com Sucesso!")
      }else{
        alert("Música não pode ser excluída.")
      }

    }
  }

  public editar(index:number):void{
    this._router.navigate(['/editarMusica', index])
  }

  public irParaCriarMusica():void{
    this._router.navigate(['/criarMusica'])
  }

}
