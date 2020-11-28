import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth.component';
import { CountriesComponent } from './components/countries.component';
import { NewsComponent } from './components/news.component';
import { MyNewsAppDB } from './newsappdb';

const ROUTES: Routes = [
  { path: '', component: AppComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'news/:country/:code', component: NewsComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' } 
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CountriesComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MyNewsAppDB],
  bootstrap: [AppComponent]
})
export class AppModule { }
