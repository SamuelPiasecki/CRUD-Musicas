import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarMusicasComponent } from './components/criar-musicas/criar-musicas.component';
import { EditarMusicasComponent } from './components/editar-musicas/editar-musicas.component';
import { ListaDeMusicasComponent } from './components/lista-de-musicas/lista-de-musicas.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserGuard } from './services/user.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignUpComponent},
  {path:'listaDeMusica', component: ListaDeMusicasComponent, canActivate: [UserGuard]},
  {path:'editarMusica/:index', component: EditarMusicasComponent, canActivate: [UserGuard]},
  {path:'criarMusica', component: CriarMusicasComponent, canActivate: [UserGuard]},
  {path:'**', redirectTo:'/login'},
  {path:"", redirectTo:'/login', pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
