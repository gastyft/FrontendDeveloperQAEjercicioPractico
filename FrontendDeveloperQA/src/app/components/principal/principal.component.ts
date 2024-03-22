import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';
import { empleados } from '../../model/empleados';

@Component({
    selector: 'app-principal',
    standalone: true,
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule, FormsModule],
})
export class PrincipalComponent  implements OnInit {
    
    data: any;
    empleados: any;
    empleado:any;
    modoEdicion: boolean = false;
  empleadoEditado: any = {};
  indiceEditado: number = -1;
  //Declaro variables para Ngmodel para crear un nuevo empleado
  nombre: string ='';
  apellido: string | undefined;
  dni:number | undefined;
  compania: string ='';
fechaEgreso: any;
fechaIngreso: any;
actualizacionExitosa: boolean =false;
 


    constructor( 
      private router: Router,
      private datosEmpleados: EmpleadosService,
      private activatedRoute: ActivatedRoute
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
        const id_estudios = this.activatedRoute.snapshot.params['id_estudios'];
        
        // Validar el formato de la fecha
        const fechaIngresoPattern = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/;
                
        if (!fechaIngresoPattern.test(this.empleadoEditado.fechaIngreso) || !fechaIngresoPattern.test(this.empleadoEditado.fechaEgreso)) {
            swal("", "Formato de fecha incorrecto. Use el formato dd-mm-yyyy hh:mm:ss", "error");
            this.actualizacionExitosa=false;
            return; // Detener la ejecución si el formato de la fecha es incorrecto
        }
   {
        
        this.datosEmpleados.update(id_estudios, this.empleadoEditado).subscribe(
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
      CrearEmpleados():void{
        const emp = new this.empleado(this.nombre, this.apellido);
        this.datosEmpleados.createEmpleado(emp).subscribe(
          data =>{
            console.log(data);
        
      
      });
      if(this.empleado != null){
        alert("Estudios agregados"); 
            
        this.router.navigate(['/boton-estudios']);
      }
      else{
        alert("fallo al guardar estudios");
        this.router.navigate(['/boton-estudios']);
      }
       }
    ngOnInit(): void {
        this.cargarDatos();
        swal("Bienvenido a mi E-commerce", "Soy Desarrollador Full-Stack Jr y Tester Manual Trainee en busca de mi primer trabajo IT con ganas de trabajar y seguir aprendiendo en el mundo de la programación", "")
    }


}
 


