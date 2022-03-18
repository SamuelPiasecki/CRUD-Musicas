import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Musica } from 'src/app/models/musica';
import { MusicasService } from 'src/app/services/musicas.service';

@Component({
  selector: 'app-editar-musicas',
  templateUrl: './editar-musicas.component.html',
  styleUrls: ['./editar-musicas.component.scss']
})
export class EditarMusicasComponent implements OnInit {

  public formEditar: FormGroup
  private index : number = -1

  constructor(
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _musicaService: MusicasService,
    private _formBuilder: FormBuilder
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
        this.index = parametros["index"];
        let musica = this._musicaService.getMusica(this.index);
        this.formEditar = this._formBuilder.group({
          nome: [musica.getNome(), [Validators.required]],
          album: [musica.getAlbum(), [Validators.required]],
          cantor: [musica.getCantor(), [Validators.required]],
          produtor: [musica.getProdutor(), [Validators.required]],
          ano: [musica.getAno(), [Validators.required, Validators.min(1000)]],
          disponivel: [musica.getDisponivel(), [Validators.required]],
          genero: [musica.getGenero(), [Validators.required]],
        });
      }
    });
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
      let musica = new Musica(
          this.formEditar.controls['nome'].value,
          this.formEditar.controls['album'].value,
          this.formEditar.controls['cantor'].value,
          this.formEditar.controls['produtor'].value,
          this.formEditar.controls['ano'].value,
          this.formEditar.controls['disponivel'].value,
          this.formEditar.controls['genero'].value
        )
      if(this._musicaService.editarMusica(this.index, musica)){
        alert('Música editada!')
        this._router.navigate(['/listaDeMusica'])
    } else {
      alert('Erro ao salvar a música');
    }
  }

}
