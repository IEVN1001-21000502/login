import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ResistenciaGuardada {
  color1: string;
  color2: string;
  color3: string;
  tolerancia: string;
}

interface ResistenciaCalculada extends ResistenciaGuardada {
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
  resistenciasGuardadas: ResistenciaGuardada[] = [];
  resistenciasCalculadas: ResistenciaCalculada[] = [];
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
    
    const nuevaResistencia: ResistenciaGuardada = {
      color1,
      color2,
      color3,
      tolerancia
    };

    this.resistenciasGuardadas.push(nuevaResistencia);
    this.guardarResistencias();
    this.formGroup.reset();
  }

  guardarResistencias(): void {
    localStorage.setItem("resistencias", JSON.stringify(this.resistenciasGuardadas));
  }

  cargarResistencias(): void {
    const resistenciasGuardadas = localStorage.getItem("resistencias");
    if (resistenciasGuardadas) {
      this.resistenciasGuardadas = JSON.parse(resistenciasGuardadas);
    }
  }

  calcularResistencias(): void {
    this.resistenciasCalculadas = this.resistenciasGuardadas.map(resistencia => {
      const valor1 = this.obtenerValorColor(resistencia.color1) * 10 + this.obtenerValorColor(resistencia.color2);
      const valor2 = this.obtenerValorMultiplicador(resistencia.color3);
      const tolerancia2 = this.obtenerValorTolerancia(resistencia.tolerancia);
      const valorResistencia = valor1 * valor2;
      const ValorMaximo = valorResistencia + (valorResistencia * tolerancia2);
      const ValorMinimo = valorResistencia - (valorResistencia * tolerancia2);

      return {
        ...resistencia,
        valorResistencia,
        ValorMaximo,
        ValorMinimo
      };
    });
  }

  obtenerValorColor(color: string): number {
    const colores: { [key: string]: number } = {
      'black': 0, 'brown': 1, 'red': 2, 'orange': 3, 'yellow': 4,
      'green': 5, 'blue': 6, 'violet': 7, 'gray': 8, 'white': 9
    };
    return colores[color.toLowerCase()] || 0;
  }
  
  obtenerValorMultiplicador(color: string): number {
    const multiplicadores: { [key: string]: number } = {
      'black': 1, 'brown': 10, 'red': 100, 'orange': 1000,
      'yellow': 10000, 'green': 100000, 'blue': 1000000,
      'violet': 10000000, 'gray': 100000000, 'white': 1000000000
    };
    return multiplicadores[color.toLowerCase()] || 1;
  }
  

  obtenerValorTolerancia(tolerancia: string): number {
    return tolerancia === 'Oro' ? 0.05 : 0.1;
  }

  toggleTabla(): void {
    this.mostrarTabla = !this.mostrarTabla;
    if (this.mostrarTabla) {
      this.calcularResistencias();
    }
  }
}