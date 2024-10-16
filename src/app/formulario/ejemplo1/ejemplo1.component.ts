import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Usuario{
  nombre: string;
  edad: number;
  email: string;
}
@Component({
  selector: 'app-ejemplo1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ejemplo1.component.html',
  styles: ``
})
export default class Ejemplo1Component implements OnInit{
  formGroup!: FormGroup;
  nombre: string = 'Miguel';

  persona: Usuario = {
    nombre: 'Juan',
    edad: 25,
    email: 'miguelrumbo24@gmail.com'
  }

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombre: [''],
      edad : [''],
      email: ['']
    })
  }

  onSubmit():void{
    const {nombre, edad, email} = this.formGroup.value;
    this.persona.nombre = nombre
    this.persona.edad = edad
    this.persona.email = email

    let personaJSON = JSON.stringify(this.persona)
    
    localStorage.setItem("persona", personaJSON);
  }

  subImprimir():void{
    const usuarioGuardado = localStorage.getItem("persona");
    if (usuarioGuardado){
      const usuarioRecuperado: Usuario = JSON.parse(usuarioGuardado);
      this.persona = usuarioRecuperado;
    }
  }
}
