import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Resistencia{
  color1:string;
  color2:string;
  color3:string;
  tolerancia:string;
  valorResistencia:number;
  ValorMaximo:number;
  ValorMinimo:number;
}

@Component({
  selector: 'app-resistencia',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resistencia.component.html',
  styleUrl: './resistencia.component.css'
})
export default class ResistenciaComponent {
  formGroup!: FormGroup;
  nombre: string = 'Miguel';

  resistencia: Resistencia = {
    color1: 'verde',
    color2: 'azul',
    color3: 'rojo',
    tolerancia: 'dorada',
    valorResistencia: 0,
    ValorMaximo: 0,
    ValorMinimo: 0
  }

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup{
    return this.fb.group({
      color1: [''],
      color2 : [''],
      color3: [''],
      tolerancia: ['']
    })
  }

  onSubmit():void{
    const {color1, color2, color3, tolerancia} = this.formGroup.value;
    this.resistencia.color1 = color1
    this.resistencia.color2 = color2
    this.resistencia.color1 = color3
    this.resistencia.color1 = tolerancia
    let valor1 = color1 + color2;
    let valor2 = parseFloat(color3);
    let tolerancia2 = parseFloat(tolerancia);
    let Fresistencia =  parseFloat(valor1);
    let valorResistencia = (Fresistencia * valor2);
    let ValorMaximo = (valorResistencia) + (valorResistencia * tolerancia2) ;
    let ValorMinimo = (valorResistencia) - (valorResistencia * tolerancia2) ;

    // Agregar los nuevos valores al objeto resistencia
    this.resistencia.valorResistencia = valorResistencia;
    this.resistencia.ValorMaximo = ValorMaximo;
    this.resistencia.ValorMinimo = ValorMinimo;

    let resistenciaJSON = JSON.stringify(this.resistencia);

    localStorage.setItem("resistencias", resistenciaJSON);
  }

  subImprimir():void{
    const resistenciaGuardada = localStorage.getItem("resistencias");
    if (resistenciaGuardada){
      const resistenciaRecuperada: Resistencia = JSON.parse(resistenciaGuardada);
      this.resistencia = resistenciaRecuperada;
    }
  }
}
