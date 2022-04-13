import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicaFirebaseService } from 'src/app/services/musica-firebase.service';

@Component({
  selector: 'app-editar-musicas',
  templateUrl: './editar-musicas.component.html',
  styleUrls: ['./editar-musicas.component.scss']
})
export class EditarMusicasComponent implements OnInit {

  public formEditar: FormGroup
  private id: any

  constructor(
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _musicaService: MusicaFirebaseService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.formEditar = this._formBuilder.group({
      nome: ['', [Validators.required]],
      album: ['', [Validators.required]],
      cantor: ['', [Validators.required]],
      produtor: ['', [Validators.required]],
      ano: ['', [Validators.required, Validators.min(1000)]],
      disponivel: ['', [Validators.required]],
      genero: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._actRoute.params.subscribe((parametros) => {
      if (parametros["index"]) {
        this.id = parametros["index"]
        this._musicaService.getMusica(parametros["index"])
          .subscribe(res => {
            let musicaRef: any = res;
            this.formEditar = this._formBuilder.group({
              nome: [musicaRef.nome, [Validators.required]],
              album: [musicaRef.album, [Validators.required]],
              cantor: [musicaRef.cantor, [Validators.required]],
              produtor: [musicaRef.produtor, [Validators.required]],
              ano: [musicaRef.ano, [Validators.required, Validators.min(1000)]],
              disponivel: [musicaRef.disponivel, [Validators.required]],
              genero: [musicaRef.genero, [Validators.required]],
            })
          })
      } 
    })
  }

  private validarFormulario() {
    for (let campos in this.formEditar.controls) {
      this.formEditar.controls[campos].markAsTouched();
    }
  }

  public submitForm() {
    this.validarFormulario();
    if (!this.formEditar.valid) {
      return
    } else {
      this.salvar()
    }
  }

  public salvar(): void {
    this._musicaService.editarMusica(this.formEditar.value, this.id)
      .then(() => {
        this._snackBar.open("Música editada!!", "Ok", {
          panelClass: ['blue-snackbar']
        })
        //alert("Música editada com sucesso!")
        this._router.navigate(["/listaDeMusica"])
      })
      .catch(() => {
        console.log()
        //alert("Música não pode ser editada")
        this._snackBar.open("Música não pode ser editada", "Ok", {
          panelClass: ['blue-snackbar']
        })
      })
  }

}
