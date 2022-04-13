import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router,
    private userService: UserService,
    private _formBuilder: FormBuilder,
    private snackBar:MatSnackBar
  ) {
    this.formLogin = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void { }

  public formLogin: FormGroup

  private validarFormulario() {
    for (let campos in this.formLogin.controls) {
      this.formLogin.controls[campos].markAsTouched()
    }
  }

  public submitForm() {
    this.validarFormulario()
    if (!this.formLogin.valid) {
      return
    }
    this.logarComEmailPassword()
  }

  logarComEmailPassword() {
    this.userService.loginComEmailPassword(this.formLogin.controls['email'].value,
      this.formLogin.controls['password'].value)
      .then(() => {
        this.snackBar.open("Login efetuado com sucesso!")
        this._router.navigate(['/listaDeMusica'])
      })
      .catch((error) => {
        this.snackBar.open("Erro ao efetuar login, tente novamente")
        console.log(error)
      })
  }

  logarComGoogleAccount() {
    this.userService.loginComGoogleAccount()
      .then(() => {
        this.snackBar.open("Login efetuado com sucesso!", '', {duration: 1000})
        this._router.navigate(['/listaDeMusica'])
      })
      .catch((error) => {
        this.snackBar.open("Erro ao efetuar login, tente novamente", )
        console.log(error)
      })
  }
}
