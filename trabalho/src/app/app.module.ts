import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ListaDeMusicasComponent } from './components/lista-de-musicas/lista-de-musicas.component';
import { CriarMusicasComponent } from './components/criar-musicas/criar-musicas.component';
import { EditarMusicasComponent } from './components/editar-musicas/editar-musicas.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.prod';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmComponent } from './components/lista-de-musicas/dialog-confirm/dialog-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NgxMaskModule } from 'ngx-mask';
import { LogoutConfirmComponent } from './components/lista-de-musicas/logout-confirm/logout-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaDeMusicasComponent,
    CriarMusicasComponent,
    EditarMusicasComponent,
    DialogConfirmComponent,
    LoginComponent,
    SignUpComponent,
    LogoutConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
