import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginatorDefaultOptions } from '@angular/material/paginator';
import { Musica } from '../models/musica';

@Injectable({
  providedIn: 'root'
})
export class MusicaFirebaseService {

  private _PATH: string = "musicas"

  constructor(private angularFire: AngularFirestore) { }

  getMusica(id: string) {
    return this.angularFire.collection(this._PATH)
      .doc(id).valueChanges()
  }

  getMusicas() {
    return this.angularFire.collection(this._PATH)
      .snapshotChanges()
  }

  criarMusica(musica: Musica) {
    return this.angularFire.collection(this._PATH)
      .add(musica)
  }

  deletarMusica(musica: Musica) {
    return this.angularFire.collection(this._PATH)
      .doc(musica.id).delete()
  }

  editarMusica(musica: Musica, id: string) {
    return this.angularFire.collection(this._PATH)
      .doc(id).update({
        nome: musica.nome,
        album: musica.album,
        cantor: musica.cantor,
        produtor: musica.produtor,
        genero: musica.genero,
        ano: musica.ano,
        disponivel: musica.disponivel
      })
  }
}
