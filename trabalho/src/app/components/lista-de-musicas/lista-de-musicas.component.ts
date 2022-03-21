import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Musica } from 'src/app/models/musica';
import { MusicaFirebaseService } from 'src/app/services/musica-firebase.service';

@Component({
  selector: 'app-lista-de-musicas',
  templateUrl: './lista-de-musicas.component.html',
  styleUrls: ['./lista-de-musicas.component.scss']
})
export class ListaDeMusicasComponent implements OnInit {

  lista_musicas: Musica[] = []

  constructor(private _router: Router, private _musicaService: MusicaFirebaseService) { }

  ngOnInit(): void {
    this._musicaService.getMusicas()
      .subscribe(res => {
        this.lista_musicas = res.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Musica
          } as Musica
        })
      })
  }

  public excluir(musica: Musica): void {
    let resultado = confirm("Deseja excluir a Música da Lista: " + musica.nome + "?")
    if (resultado) {
      this._musicaService.deletarMusica(musica)
        .then(() => { alert("Música excluída da lista") })
        .catch(() => { alert("Erro ao excluir música!") })
    }
  }

  public editar(musica: Musica): void {
    this._router.navigate(['/editarMusica', musica.id])
  }

  public irParaCriarMusica(): void {
    this._router.navigate(['/criarMusica'])
  }

}
