import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { MatPaginatorDefaultOptions } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Musica } from '../models/musica';

@Injectable({
  providedIn: 'root'
})
export class MusicaFirebaseService {

  private _PATH: string = "musicas"
  task?: AngularFireUploadTask
  uploadedFileUrl?: Observable<string>
  fileName?: string
  downloadURL?: string


  constructor(private angularFire: AngularFirestore, private storage: AngularFireStorage) { }

  async uploadStorage(file: File, musica : Musica) {
    if (file.type.split('/')[0] != 'image') {
      console.log("Tipo Não Suportado!")
      return
    }
    this.fileName = file.name
    const path = `imagens/${new Date().getTime()}_${file.name}`
    const fileRef = this.storage.ref(path)
    this.task = this.storage.upload(path, file)
    return this.task.snapshotChanges().pipe(
      finalize(() => {
        this.uploadedFileUrl = fileRef.getDownloadURL()
        this.uploadedFileUrl.subscribe((resp) => {
          musica.imageName = file.name
          musica.downloadURL = resp
          this.criarMusica(musica)
        })
      })
    ).subscribe()
  }

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
        disponivel: musica.disponivel,
        imageName: this.fileName,
        downloadURL: this.downloadURL
      })
  }

}
