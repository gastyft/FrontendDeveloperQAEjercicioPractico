import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from './components/principal/principal.component';
import { Error404Component } from './components/error404/error404.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
export const routes: Routes = [
    {path: '', 
    redirectTo: 'principal', pathMatch:'full'},
     {path: 'principal', 
     component:PrincipalComponent}, 
     {path: 'header', 
     component:HeaderComponent}, 
     {path: 'footer', 
    component:FooterComponent},

    { path: '**',  
  component: Error404Component },
  
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    
    exports: [RouterModule]
  })
  export class AppRoutingModule { }