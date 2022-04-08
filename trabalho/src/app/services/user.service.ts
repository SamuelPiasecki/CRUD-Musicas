import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any
  storage: Storage

  constructor(private authService: AngularFireAuth) {
    this.storage = window.localStorage
  }

  loginComEmailPassword(email: string, password: string) {
    return this.authService.signInWithEmailAndPassword(email, password).then(() => {
      this.storage.setItem("condicao", "autenticado")
    })
  }

  cadastrarComEmailPassword(email: string, password: string) {
    return this.authService.createUserWithEmailAndPassword(email, password)
  }

  loginComGoogleAccount() {
    return this.authLoginProvider(new GoogleAuthProvider()).then(() => {
      this.storage.setItem("condicao", "autenticado")
    })
  }

  authLoginProvider(provider: any) {
    return this.authService.signInWithPopup(provider)
  }

  logout() {
    this.storage.setItem("condicao", "deslogado")
    return this.authService.signOut()
  }
}
