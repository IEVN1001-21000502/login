import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
  horasPorPagar: number;
  horasExtras: number;
  subtotal: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export default class EmpleadosComponent implements OnInit {
  formGroup: FormGroup;
  empleados: Empleado[] = [];
  totalAPagar: number = 0;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18)]],
      horasTrabajadas: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadEmpleados();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const empleado: Empleado = this.formGroup.value;
      empleado.horasPorPagar = Math.min(empleado.horasTrabajadas, 40);
      empleado.horasExtras = Math.max(empleado.horasTrabajadas - 40, 0);
      empleado.subtotal = empleado.horasPorPagar * 70 + empleado.horasExtras * 140;

      this.empleados.push(empleado);
      this.saveEmpleados();
      this.formGroup.reset();
    }
  }

  modificarEmpleado() {
    const matriculaModificar = (document.getElementById('matricula_modificar') as HTMLInputElement).value;
    const index = this.empleados.findIndex(e => e.matricula === matriculaModificar);
    if (index !== -1) {
      this.formGroup.patchValue(this.empleados[index]);
      this.empleados.splice(index, 1);
      this.saveEmpleados();
    } else {
      alert('Empleado no encontrado');
    }
  }

  eliminarEmpleado() {
    const matriculaEliminar = (document.getElementById('matricula_modificar') as HTMLInputElement).value;
    const index = this.empleados.findIndex(e => e.matricula === matriculaEliminar);
    if (index !== -1) {
      this.empleados.splice(index, 1);
      this.saveEmpleados();
    } else {
      alert('Empleado no encontrado');
    }
  }

  generarTabla() {
    this.calcularTotalAPagar();
    // La tabla se actualiza automáticamente en el template
  }

  imprimirTabla() {
    window.print();
  }

  private saveEmpleados() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  private loadEmpleados() {
    const storedEmpleados = localStorage.getItem('empleados');
    if (storedEmpleados) {
      this.empleados = JSON.parse(storedEmpleados);
      this.calcularTotalAPagar();
    }
  }

  private calcularTotalAPagar() {
    this.totalAPagar = this.empleados.reduce((total, empleado) => total + empleado.subtotal, 0);
  }
}