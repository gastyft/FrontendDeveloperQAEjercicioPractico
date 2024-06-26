import { RouterLink, RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
 
import { PrincipalComponent } from './components/principal/principal.component';
import { Error404Component } from './components/error404/error404.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClient} from '@angular/common/http';
import { DatePipe  } from '@angular/common';
import { EmpleadosService } from './services/empleados.service';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


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
    imports: [ RouterLink,RouterModule.forRoot(routes), FormsModule, BsDatepickerModule.forRoot(),
      TimepickerModule.forRoot(), ],
    providers: [DatePipe, EmpleadosService,],
    exports: [RouterModule,],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  })
  export class AppRoutingModule { }