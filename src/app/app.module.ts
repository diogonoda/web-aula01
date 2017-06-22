import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 

import { AppComponent } from './app.component';
import { ContatoComponent } from './contato/contato.component';
import { HomeComponent } from './home/home.component';
import { ArtigoComponent } from './artigo/artigo.component';
import { routes } from './routes';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    HomeComponent,
    ArtigoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 

}