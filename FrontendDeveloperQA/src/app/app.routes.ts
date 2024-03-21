import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PrincipalComponent } from './components/principal/principal.component';
import { Error404Component } from './components/error404/error404.component';
export const routes: Routes = [
    {path: '', 
    redirectTo: 'app.component', pathMatch:'full'},
     {path: 'principal', 
     component:PrincipalComponent}, 
  

    { path: '**',  
  component: Error404Component },
  
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    
    exports: [RouterModule]
  })
  export class AppRoutingModule { }