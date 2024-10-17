import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Resistencia {
  color1: string;
  color2: string;
  color3: string;
  tolerancia: string;
  valorResistencia: number;
  ValorMaximo: number;
  ValorMinimo: number;
}

@Component({
  selector: 'app-resistencia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resistencia.component.html',
  styleUrl: './resistencia.component.css'
})
export default class ResistenciaComponent implements OnInit {
  formGroup!: FormGroup;
  resistencias: Resistencia[] = [];
  mostrarTabla: boolean = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
    this.cargarResistencias();
  }

  initForm(): FormGroup {
    return this.fb.group({
      color1: [''],
      color2: [''],
      color3: [''],
      tolerancia: ['']
    });
  }

  onSubmit(): void {
    const { color1, color2, color3, tolerancia } = this.formGroup.value;
    let valor1 = parseInt(color1) * 10 + parseInt(color2);
    let valor2 = parseInt(color3);
    let tolerancia2 = parseFloat(tolerancia);
    let valorResistencia = valor1 * valor2;
    let ValorMaximo = valorResistencia + (valorResistencia * tolerancia2);
    let ValorMinimo = valorResistencia - (valorResistencia * tolerancia2);

    const nuevaResistencia: Resistencia = {
      color1,
      color2,
      color3,
      tolerancia,
      valorResistencia,
      ValorMaximo,
      ValorMinimo
    };

    this.resistencias.push(nuevaResistencia);
    this.guardarResistencias();
    this.formGroup.reset();
  }

  guardarResistencias(): void {
    localStorage.setItem("resistencias", JSON.stringify(this.resistencias));
  }

  cargarResistencias(): void {
    const resistenciasGuardadas = localStorage.getItem("resistencias");
    if (resistenciasGuardadas) {
      this.resistencias = JSON.parse(resistenciasGuardadas);
    }
  }

  obtenerColorNombre(codigo: string): string {
    const colores:any = {
      '0': 'Negro', '1': 'Marrón', '2': 'Rojo', '3': 'Naranja', '4': 'Amarillo',
      '5': 'Verde', '6': 'Azul', '7': 'Violeta', '8': 'Gris', '9': 'Blanco'
    };
    return colores[codigo] || codigo;
  }

  obtenerColorMultiplicador(valor: string): string {
    const multiplicadores:any = {
      '1': 'Negro', '10': 'Marrón', '100': 'Rojo', '1000': 'Naranja',
      '10000': 'Amarillo', '100000': 'Verde', '1000000': 'Azul',
      '10000000': 'Violeta', '100000000': 'Gris', '1000000000': 'Blanco'
    };
    return multiplicadores[valor] || valor;
  }

  obtenerToleranciaNombre(valor: string): string {
    return valor === '0.05' ? 'Oro (±5%)' : 'Plata (±10%)';
  }

  toggleTabla(): void {
    this.mostrarTabla = !this.mostrarTabla;
  }
}