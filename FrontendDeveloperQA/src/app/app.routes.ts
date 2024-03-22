import { RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
 
import { PrincipalComponent } from './components/principal/principal.component';
import { Error404Component } from './components/error404/error404.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmpleadosService } from './services/empleados.service';
import { FormsModule } from '@angular/forms';
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
    imports: [ CommonModule, RouterModule.forRoot(routes), FormsModule ],
    providers: [ EmpleadosService],
    exports: [RouterModule,],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  })
  export class AppRoutingModule { }