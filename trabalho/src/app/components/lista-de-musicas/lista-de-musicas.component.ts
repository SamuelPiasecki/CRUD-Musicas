import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Musica } from 'src/app/models/musica';
import { MusicaFirebaseService } from 'src/app/services/musica-firebase.service';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-lista-de-musicas',
  templateUrl: './lista-de-musicas.component.html',
  styleUrls: ['./lista-de-musicas.component.scss']
})
export class ListaDeMusicasComponent implements OnInit {

  lista_musicas: Musica[] = []

  constructor(private _router: Router,
    private _musicaService: MusicaFirebaseService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

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
    let dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._musicaService.deletarMusica(musica)
          .then(() => {
            this._snackBar.open("Música excluída da lista", "Ok", {
              panelClass: ['blue-snackbar']
            })
          })
          .catch(() => {
            this._snackBar.open("Erro ao excluir música!", "Ok", {
              panelClass: ['blue-snack']
            })
          })
      }
    })
  }

  public editar(musica: Musica): void {
    this._router.navigate(['/editarMusica', musica.id])
  }

  public irParaCriarMusica(): void {
    this._router.navigate(['/criarMusica'])
  }

}
