export class empleados {
  id?: number;
  nombre: string;
  apellido: string;
  compania: string;
  dni: number;
  fechaIngreso: string; 
  fechaEgreso: string;
  
  constructor(
     nombre: string,
     apellido: string,
     compania: string,
     dni: number,
     fechaIngreso: string,
     fechaEgreso: string,
  ){
     this.nombre = nombre;
     this.apellido = apellido;
     this.compania = compania;
     this.dni = dni;
     this.fechaIngreso = fechaIngreso;
     this.fechaEgreso = fechaEgreso;
  }
}