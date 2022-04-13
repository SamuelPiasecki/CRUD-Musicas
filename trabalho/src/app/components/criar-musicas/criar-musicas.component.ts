import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MusicaFirebaseService } from 'src/app/services/musica-firebase.service';

@Component({
  selector: 'app-criar-musicas',
  templateUrl: './criar-musicas.component.html',
  styleUrls: ['./criar-musicas.component.scss'],
})
export class CriarMusicasComponent implements OnInit {

  public formAdicionar: FormGroup;

  constructor(
    private _router: Router,
    private _musicaService: MusicaFirebaseService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {
    this.formAdicionar = this._formBuilder.group({
      nome: ['', [Validators.required]],
      album: ['', [Validators.required]],
      cantor: ['', [Validators.required]],
      produtor: ['', [Validators.required]],
      ano: ['', [Validators.required, Validators.min(1000)]],
      disponivel: ['', [Validators.required]],
      genero: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  private validarFormulario() {
    for (let campos in this.formAdicionar.controls) {
      this.formAdicionar.controls[campos].markAsTouched();
    }
  }

  public submitForm() {
    this.validarFormulario();
    if (!this.formAdicionar.valid) {
      return;
    } else {
      this.salvar();
    }
  }


  public salvar(): void {
    const target = document.getElementById("file") as HTMLInputElement
    const file: File = (target.files as FileList)[0]
    if (file.type.split('/')[0] != 'image') {
      this._snackBar.open("Tipo de arquivo não suportado", "Ok")
      console.log("Tipo Não Suportado!")
      return
    } else {
      this._musicaService
        .uploadStorage(file, this.formAdicionar.value)
        .then(() => {
          this._snackBar.open("Música adicionada!", "Ok", {
            panelClass: ['blue-snackbar']
          })
          this._router.navigate(['/listaDeMusica'])
        })
        .catch(() => {
          this._snackBar.open("Erro ao salvar a música", "Ok", {
            panelClass: ['blue-snackbar']
          })
        })
    }
  }
}
