import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Musica } from 'src/app/models/musica';
import { MusicaFirebaseService } from 'src/app/services/musica-firebase.service';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { LogoutConfirmComponent } from './logout-confirm/logout-confirm.component';

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
    public dialog: MatDialog,
    private userService: UserService) { }

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
            this._snackBar.open("Música excluída da lista", "", {
              duration: 1000,
              panelClass: ['blue-snackbar']
            })
          })
          .catch(() => {
            this._snackBar.open("Erro ao excluir música!", "", {
              duration: 1000,
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

  public logout() {
    /* let resultado = confirm("Vai sai?");
    if (resultado) {
      this.userService.logout()
        .then(() => {
          this._router.navigate(['/login'])
        })
        .catch(() => {
          alert("Deu errado")
        })
    } */
    let resultado = this.dialog.open(LogoutConfirmComponent, {width: '250px'})

    resultado.afterClosed().subscribe(result =>{
      if (result) {
        this.userService.logout()
          .then(() => {
            this._router.navigate(['/login'])
          })
          .catch(() => {
            alert("Deu errado")
          })
      }
    })
  }

}
