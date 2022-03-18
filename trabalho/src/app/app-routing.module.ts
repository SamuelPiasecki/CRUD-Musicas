import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarMusicasComponent } from './components/criar-musicas/criar-musicas.component';
import { EditarMusicasComponent } from './components/editar-musicas/editar-musicas.component';
import { ListaDeMusicasComponent } from './components/lista-de-musicas/lista-de-musicas.component';

const routes: Routes = [
  {path:'listaDeMusica', component: ListaDeMusicasComponent},
  {path:'editarMusica/:index', component: EditarMusicasComponent},
  {path:'criarMusica', component: CriarMusicasComponent},
  {path:'**', redirectTo:'/listaDeMusica'},
  {path:"", redirectTo:'/listaDeMusica', pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
