export class empleados{
    id?: number;
    nombre: String;
    apellido: String;
   compania: String;
    dni: number;
    fechaIngreso: Date | string; // Puede ser Date o string
  fechaEgreso: Date | string;
    

constructor(  
   nombre: String,
   apellido: String,
   compania: String,
   dni: number,
   fechaIngreso: Date | string,
    fechaEgreso: Date | string,
   ){

   this. nombre=  nombre;
   this. apellido= apellido;
   this.compania= compania;
   this.dni= dni;
   this.fechaIngreso= fechaIngreso;
   this.fechaEgreso= fechaEgreso;
   }
   }