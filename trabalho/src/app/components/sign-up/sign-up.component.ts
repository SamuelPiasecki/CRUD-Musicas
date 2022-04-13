import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public formSignUp: FormGroup

  constructor(private _router: Router,
    private userService: UserService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
    this.formSignUp = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void { }

  private validarFormulario() {
    for (let campos in this.formSignUp.controls) {
      this.formSignUp.controls[campos].markAsTouched()
    }
  }

  public submitForm() {
    this.validarFormulario()
    if (!this.formSignUp.valid) {
      return
    }
    this.signUp()
  }

  signUp() {
    if (this.formSignUp.controls['password'].value ==
      this.formSignUp.controls['confirmPassword'].value) {
      this.userService.cadastrarComEmailPassword(this.formSignUp.controls['email'].value,
        this.formSignUp.controls['password'].value)
        .then(() => {
          this.snackBar.open("Cadastro efetuado com sucesso!", "", {
            duration: 1000
          })
          this._router.navigate(['/listaDeMusica'])
        })
        .catch((error) => {
          this.snackBar.open("Erro ao efetuar cadastro, tente novamente!", "Ok")
          console.log(error)
        })
    } else {
      this.snackBar.open("As senhas não conferem", "Ok")
    }
  }

}
