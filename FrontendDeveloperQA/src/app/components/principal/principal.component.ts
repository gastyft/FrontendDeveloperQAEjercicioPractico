import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule, DatePipe } from '@angular/common';
import swal from 'sweetalert';
import { empleados } from '../../model/empleados';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule, FormsModule,DatePipe, BsDatepickerModule, TimepickerModule],
    providers: [DatePipe]
  })
export class PrincipalComponent  implements OnInit {
    
    data: any;
    empleados: any;
    empleado:any;
    modoEdicion: boolean = false;
  empleadoEditado: any = {};
  indiceEditado: number = -1;
  //Declaro variables para Ngmodel para crear un nuevo empleado
  nombre: string = '';
  apellido: string = '';
  compania: string = '';
  dni!:number ;
  fechaIngreso: string = '';
  fechaIngresoFinal!: Date;
  fechaEgreso: string = '';
  fechaEgresoFinal!: Date;
actualizacionExitosa: boolean =false;
  fechaIngresoDate!: string;
  fechaEgresoDate!: string;
 
 

 


    constructor( 
      private router: Router,
      private datosEmpleados: EmpleadosService,
      private activatedRoute: ActivatedRoute,
     private datePipe: DatePipe,
      ) { }
    
      cargarDatos(){
        {
          this.datosEmpleados.getEmpleadosList().subscribe( data => {
            console.log(data)
            this.empleados= data;
            
          }) } 
      }
      activarEdicion(index: number): void {
        this.indiceEditado = index;
        this.empleadoEditado = { ...this.empleados[index] };
        this.modoEdicion = true;
      }
      desactivarEdicion(){
        this.modoEdicion= false;
      }
      onUpdateEmpleados(): void {
        const id= this.activatedRoute.snapshot.params['id'];
        
        // Validar el formato de la fecha
        const fechaIngresoPattern = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/;
                
        if (!fechaIngresoPattern.test(this.empleadoEditado.fechaIngreso) || !fechaIngresoPattern.test(this.empleadoEditado.fechaEgreso)) {
            swal("", "Formato de fecha incorrecto. Use el formato dd-mm-yyyy hh:mm:ss", "error");
            this.actualizacionExitosa=false;
            return; // Detener la ejecución si el formato de la fecha es incorrecto
        }
   {
        
        this.datosEmpleados.update(id, this.empleadoEditado).subscribe(
            data => {
                console.log(data);
    
                swal("", "Empleado editado", "success");
                this.actualizacionExitosa=true;
                 
            },
            error => {
                console.error(error);
                swal("", "Ocurrió un error al editar el empleado", "error");
            }
        );
    }
 
    }
    
    
      
      guardarCambios(): void {
        this.empleados[this.indiceEditado] = { ...this.empleadoEditado };
        this.modoEdicion = false;
        this.onUpdateEmpleados();

      }  
      CrearEmpleados(): void {


          // Validar campos vacíos
          const camposAValidar = [this.nombre, this.apellido, this.compania, this.fechaIngreso];
          for (let campo of camposAValidar) {
              if (campo.trim() === '') {
                  swal("", "Los campos no pueden estar vacíos", "warning");
                  return;
              }
          }
        // Validar el formato de la fecha de ingreso
        const fechaIngresoPattern = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/;
        if (!fechaIngresoPattern.test(this.fechaIngreso)) {
            swal("", "Formato de fecha de ingreso incorrecto. Use el formato dd-mm-yyyy hh:mm:ss", "error");
            return; // Detener la ejecución si el formato de la fecha de ingreso es incorrecto
        }
    
        // Verificar si la fecha de egreso no está vacía y su formato es incorrecto
        if (this.fechaEgreso && !fechaIngresoPattern.test(this.fechaEgreso)) {
            swal("", "Formato de fecha de egreso incorrecto. Use el formato dd-mm-yyyy hh:mm:ss", "error");
            return; // Detener la ejecución si el formato de la fecha de egreso es incorrecto
        } 
    // Formato del string de fecha de ingreso: dd-mm-yyyy hh:mm:ss

    
 
// Crear el objeto empleado

const emp = new empleados(this.nombre, this.apellido, this.compania, this.dni, this.fechaIngreso,this.fechaEgreso);
  // Verificar si se han ingresado todos los campos necesarios
if (this.nombre && this.apellido && this.dni && this.fechaIngreso) {
  // Verificar si el DNI y la compañía ya existen
  this.datosEmpleados.isCompaniaEqual(this.dni,this.compania).subscribe(
      (companiaRepetida: boolean) => {
          if (!companiaRepetida) {
              // Crear el empleado si no hay compañía repetida
              this.datosEmpleados.createEmpleado(emp).subscribe(
                  data => {
                      console.log(data);
                      swal("", "Empleado creado", "success");
                      setTimeout(() => {
                          window.location.reload();
                      }, 3000);
                  },
                  error => {
                      console.error(error);
                      swal("", "Fallo al crear empleado", "error");
                      setTimeout(() => {
                          window.location.reload();
                      }, 3000);
                  }
              );
          } else {
              // Mostrar mensaje de error si la compañía ya existe para ese DNI
              swal("", "La compañía ya existe para este empleado", "error");
          }
      },
       
  );
} else {
  // Mostrar mensaje de error si no se han ingresado todos los campos necesarios
  swal("", "Por favor, complete todos los campos", "error");
}
      }
    ngOnInit(): void {
        this.cargarDatos();
   //     swal("Bienvenido a mi E-commerce", "Soy Desarrollador Full-Stack Jr y Tester Manual Trainee en busca de mi primer trabajo IT con ganas de trabajar y seguir aprendiendo en el mundo de la programación", "")
    }



}
 
  

 
