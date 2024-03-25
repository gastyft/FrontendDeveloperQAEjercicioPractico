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
import moment from 'moment';

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
    empleados:any;
      
    empleado:any;
    modoEdicion: boolean = false;
  empleadoEditado: any;
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
  //flag 
actualizacionExitosa: boolean =false;
//Variables para  validar fecha
  fechaIngresoDate!: string;
  fechaEgresoDate!: string;
  // variable para la busqueda
  dniBusqueda: string = '';
  empleadosFiltrados: any;
  empleadosOriginales: any;

 


    constructor( 
      private router: Router,
      private datosEmpleados: EmpleadosService, //Servicio de la clase Empleados
      private activatedRoute: ActivatedRoute, // permite redirigir
     private datePipe: DatePipe,
      ) { }
    
      cargarDatos(){  //Carga de datos de empleados en lista principal usando *ngFor
        {
          this.datosEmpleados.getEmpleadosList().subscribe( data => {
            console.log(data)
          this.empleados= data;
            
          }) } 
      }
      activarEdicion(index: number): void {   //Activa la edicion de un empleado
        this.indiceEditado = index;
        this.empleadoEditado = { ...this.empleados[index] };
        this.modoEdicion = true;
      }
      desactivarEdicion(){  //desactiva el modo edicion
        this.modoEdicion= false;
      }

    onUpdateEmpleados(): void {   //Contenedora de la funcionalidad update empleados o modificar empleados con sus validaciones 
        const id = this.activatedRoute.snapshot.params['id'];
    
        if (!this.camposValidosEditar()) { 
            return;
        }
      
        if( !this.validarDNI(this.empleadoEditado.dni)){  
            swal("", "Dni no valido \n El DNI debe estar entre 2000000 y 70000000");
            return;
        }
    
        if (!this.validarFormatoFecha(this.empleadoEditado.fechaIngreso)) {
            swal("", "Formato de fecha de ingreso incorrecto. Use el formato \ndd-mm-yyyy hh:mm:ss", "error");
            return;
        }
    
        if (this.empleadoEditado.fechaEgreso !== '' && !this.validarFormatoFecha(this.empleadoEditado.fechaEgreso)) {
            swal("", "Formato de fecha de egreso incorrecto. Use el formato  \n dd-mm-yyyy hh:mm:ss", "error");
            return;
        }
    
        if (this.empleadoEditado.fechaIngreso && this.empleadoEditado.fechaEgreso && !this.validarFechaEgresoEditar()) {
            swal("", "La fecha de egreso no puede ser menor o igual que la fecha de ingreso", "error");
            return;
        }
        if(!this.validarString(this.empleadoEditado.nombre)){
swal("Atención!","Ingreso un nombre con numeros o caracteres especiales","warning");
       return; 
      }
        if(!this.validarString(this.empleadoEditado.apellido)){
            swal("Atención!","Ingreso un apellido con numeros o caracteres especiales","warning");
              return;  
             }
    
        this.actualizarEmpleado(id, this.empleadoEditado);
    }
    
    actualizarEmpleado(id: number, empleado: empleados): void {  //Funcion carga un empleado por metodo put
      this.datosEmpleados.update(id, empleado).subscribe(() => {
       
      });
      swal("", "Empleado editado", "success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    
    
      
      guardarCambios(): void { //Guarda cambios y llama a la funcion contenedora onUpdateEmpleados
        this.empleados[this.indiceEditado] = { ...this.empleadoEditado };
        this.onUpdateEmpleados();
        if(this.actualizacionExitosa)
        this.modoEdicion = false;
      }  
   
      CrearEmpleados(): void {  //Contenedora de crear empleados con sus validaciones 
        //y con validacion de que no se repita una compania con el mismo DNI
        if (!this.camposValidos()) {
            return;
        }
        if( !this.validarDNI(this.dni)){
            swal("", "Dni no valido \n El DNI debe estar entre 2000000 y 70000000");
            return;
        }
        if (!this.validarFormatoFecha(this.fechaIngreso)) {
            swal("", "Formato de fecha de ingreso incorrecto. Use el formato \ndd-mm-yyyy hh:mm:ss", "error");
            return;
        }
    
        if (this.fechaEgreso !== '' && !this.validarFormatoFecha(this.fechaEgreso)) {
            swal("", "Formato de fecha de egreso incorrecto. Use el formato  \n dd-mm-yyyy hh:mm:ss", "error");
            return;
        }
    
        if (this.fechaIngreso && this.fechaEgreso && !this.validarFechaEgreso()) {
            swal("", "La fecha de egreso no puede ser menor o igual que la fecha de ingreso", "error");
            return;
        }
        if(!this.validarString(this.nombre)){
          swal ("Atención!","Ingreso un nombre con numeros o caracteres especiales","warning");
            return; }
        if(!this.validarString(this.apellido)){
            swal("Atención!","Ingreso un apellido con numeros o caracteres especiales","warning");
              return;      
             }
    
        const empleado = new empleados(this.nombre, this.apellido, this.compania, this.dni, this.fechaIngreso, this.fechaEgreso);
    
        this.verificarEmpleadoRepetido(empleado);
    }
    
    camposValidos(): boolean {    //Validacion de que campos mencionados en el array cumplan con que tienen datos para funcion crear
        const camposAValidar = [this.nombre, this.apellido, this.compania, this.fechaIngreso];
        for (let campo of camposAValidar) {
            if (campo.trim() === '') {
                swal("", "Los campos no pueden estar vacíos", "warning");
                return false;
            }
        }
        return true;
    }
    camposValidosEditar(): boolean {  //Validacion de que campos mencionados en el array cumplan con que tienen datos para funcion editar 
        const camposAValidar = [this.empleadoEditado.nombre, this.empleadoEditado.apellido, this.empleadoEditado.compania, this.empleadoEditado.fechaIngreso];
        for (let campo of camposAValidar) {
            if (campo.trim() === '') {
                swal("", "Los campos no pueden estar vacíos", "warning");
                return false;
            }
        }
        return true;
    }
    
    
    validarFormatoFecha(fecha: string): boolean {      //Validacion que el formato de la fecha sea dd-mm-yyyy hh:mm:ss
        const fechaPattern = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/;
        return fechaPattern.test(fecha);
    }
    
    validarFechaEgreso(): boolean {  //Validacion para que fecha ingreso no sea menor o igual que la fecha egreso utilizando biblioteca moment
        const fechaIngreso = moment(this.fechaIngreso, 'DD-MM-YYYY HH:mm:ss');
        const fechaEgreso = moment(this.fechaEgreso, 'DD-MM-YYYY HH:mm:ss');
        return fechaEgreso.isAfter(fechaIngreso);
    }
    validarFechaEgresoEditar(): boolean {  //Validacion para que fecha ingreso no sea menor o igual que la fecha egreso utilizando biblioteca moment
      const fechaIngreso = moment(this.empleadoEditado.fechaIngreso, 'DD-MM-YYYY HH:mm:ss');
      const fechaEgreso = moment(this.empleadoEditado.fechaEgreso, 'DD-MM-YYYY HH:mm:ss');
      return fechaEgreso.isAfter(fechaIngreso);
  }
    
    verificarEmpleadoRepetido(empleado: empleados): void {  //Validacion de que no se repita una misma compania por DNI
        this.datosEmpleados.isCompaniaEqual(this.dni, this.compania).subscribe(
            (companiaRepetida: boolean) => {
                if (!companiaRepetida) {
                    this.crearNuevoEmpleado(empleado);
                } else {
                    swal("", "La compañía ya existe para este empleado", "error");
                }
            }
        );
    }
    
    crearNuevoEmpleado(empleado: empleados): void {  //Funcion que recibe por parametro un empleado y se hace la solicitud POST desde el Service de empleados
        this.datosEmpleados.createEmpleado(empleado).subscribe(
            data => {
                console.log(data);
            },
        );
        swal("", "Empleado creado", "success");
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }
    

      buscarPorDNI(): void {  //Funcion buscar por DNI
        if (!this.empleadosOriginales) {
            this.empleadosOriginales = [...this.empleados]; // Almacena una copia de la lista original si aún no se ha almacenado
        }             /// [...this.empleados] pasa por referencia la lista de empleados(Similar funcionamiento a punteros en C)
        if (this.dniBusqueda.trim() === '') {
            // Si el campo de búsqueda está vacío, restaura la lista original de empleados
            this.empleados = [...this.empleadosOriginales];
        } else {
            // Filtrar los empleados por el DNI ingresado
            this.empleados = this.empleadosOriginales.filter((empleado: { dni: { toString: () => string | string[]; }; }) => empleado.dni.toString().includes(this.dniBusqueda.trim()));
        }
    }

    limpiarBusqueda(): void {
      this.dniBusqueda = ''; // Borra el contenido del campo de búsqueda
      this.buscarPorDNI(); // Restaura la lista original de empleados
  }
   validarString(str: string): boolean { //Validacion para nombre y apellido
    // Expresión para verificar si el string contiene solo letras, espacios y acentos
    const pattern = /^[a-zA-Z\u00C0-\u017F\s]*$/;
    return pattern.test(str);
}
EliminarEmpleado(id?: number): void {  //Funcion de eliminar con cartel de confirmacion de sweetAlert
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este empleado.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
     
    })
    .then((willDelete) => {
      if (willDelete) {
        if (id != null) {
          this.datosEmpleados.deleteEmpleado(id).subscribe(
            data => {
                
            
            },
            
          );
          swal({
            title: "¡Se ha eliminado el empleado!",
            icon: "success",
             
          });          setTimeout(() => {
            location.reload();
          }, 2000); // 2000 milisegundos = 2 segundos de retraso

        }
      } 
    });
  }
  validarDNI(dni: number): boolean { //Valida el dni que este entre cierto rango
    if (this.dni < 2000000 || this.dni > 70000000) {
      // Si el DNI está fuera del rango, 
   //   alert('El DNI debe estar entre 2000000 y 70000000');
    return false;
    }
    else 
    return true;
}
    ngOnInit(): void {  //Ciclo de vida de Angular
        this.cargarDatos();   //Carga datos cada vez que recarga la pagina 
      }



}
 
  

 
