import { Injectable } from '@angular/core';
import { Musica } from '../models/musica';

@Injectable({
  providedIn: 'root'
})
export class MusicasService {
  private Musicas: Musica[] = []

  constructor() {
    this.inserirMusica(new Musica("Beat it","não sei","Michael Jackson",
    "Não sei também", "Pop", 1982, "Spotify"))
   }

  public inserirMusica(Musica: Musica): boolean {
    this.Musicas.push(Musica)
    return true
  }

  public getMusicas(): Musica[] {
    return this.Musicas
  }

  public getMusica(index: number): Musica {
    return this.Musicas[index]
  }

  public editarMusica(index: number, Musica: Musica): boolean {
    this.Musicas[index] = Musica
    return true
  }

  public excluirMusica(index: number): boolean {
    this.Musicas.splice(index, 1)
    return true
  }

}

