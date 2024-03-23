 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { empleados } from '../model/empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
 
  url = "http://localhost:8080/empleados/";
  constructor( private http: HttpClient) { }

  public getEmpleadosList():Observable<empleados>{ // metodo que trae la lista de empleados
   return this.http.get<empleados>(`${this.url}getempleadoslist`);
  }
public update( id:number , empleados: empleados): Observable<empleados>{ //modifica un empleado por id  y se pasa como parametro una instancia de empleados
  return this.http.put<empleados>(`${this.url}editarusuario/${id}?nombre=${empleados.nombre}&apellido=${empleados.apellido}&compania=${empleados.compania}&dni=${empleados.dni}&fechaIngreso=${empleados.fechaIngreso}&fechaEgreso=${empleados.fechaEgreso}`,empleados); 
}

public deleteDispo(id: number): Observable<any>{  //borra un empleado por ID 
  return this.http.delete<any>(this.url +`borrar/${id}`);
}
public getEmpleadoDNI(dni: number):Observable<empleados>{ // obtener empleado por ID
  return this.http.get<empleados>(this.url + `traer/${dni}`);
 }
   createEmpleado(empleados: empleados): Observable<any>{    //crea una nueva fila en la base de datos de empleados
  return this.http.post<any>(this.url + 'crear', empleados);
 }
   public isIngresado(dni:number, compania: string): Observable<boolean>{  // PARA EDITAR
      return this.http.get<boolean>(this.url +`compania/${dni}/${compania}`);
   }
   public isCompaniaEqual(dni: number, compania: string): Observable<boolean> {  
    return this.http.get<boolean>(`${this.url}compania/${dni}/${compania}`);
}
  
}