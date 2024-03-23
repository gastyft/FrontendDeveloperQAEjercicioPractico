export class empleados{
    id?: number;
    nombre: String;
    apellido: String;
   compania: String;
    dni: number;
    fechaIngreso: Date | String ; 
  fechaEgreso: Date | String;
    

constructor(  
   nombre: String,
   apellido: String,
   compania: String,
   dni: number,
   fechaIngreso: Date | String,
    fechaEgreso: Date | String ,
   ){

   this. nombre=  nombre;
   this. apellido= apellido;
   this.compania= compania;
   this.dni= dni;
   this.fechaIngreso= fechaIngreso;
   this.fechaEgreso= fechaEgreso;
   }
   }