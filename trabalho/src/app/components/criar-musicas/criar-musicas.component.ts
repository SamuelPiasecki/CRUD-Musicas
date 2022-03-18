import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Musica } from 'src/app/models/musica';
import { MusicasService } from 'src/app/services/musicas.service';

@Component({
  selector: 'app-criar-musicas',
  templateUrl: './criar-musicas.component.html',
  styleUrls: ['./criar-musicas.component.scss'],
})
export class CriarMusicasComponent implements OnInit {
  public formAdicionar: FormGroup;

  constructor(
    private _router: Router,
    private _musicaService: MusicasService,
    private _formBuilder: FormBuilder
  ) {
    this.formAdicionar = this._formBuilder.group({
      nome: ['', [Validators.required]],
      album: ['', [Validators.required]],
      cantor: ['', [Validators.required]],
      produtor: ['', [Validators.required]],
      ano: ['', [Validators.required, Validators.min(1000)]],
      disponivel: ['', [Validators.required]],
      genero: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

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
    if (
      this._musicaService.inserirMusica(
        new Musica(
          this.formAdicionar.controls['nome'].value,
          this.formAdicionar.controls['album'].value,
          this.formAdicionar.controls['cantor'].value,
          this.formAdicionar.controls['produtor'].value,
          this.formAdicionar.controls['ano'].value,
          this.formAdicionar.controls['disponivel'].value,
          this.formAdicionar.controls['genero'].value
        )
      )
    ) {
      alert('Música adicionada a lista');
      this._router.navigate(['/listaDeMusica']);
    } else {
      alert('Erro ao salvar a música');
    }
  }
}
