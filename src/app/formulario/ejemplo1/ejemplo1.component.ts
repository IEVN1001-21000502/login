import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
 
interface Usuario{
  nombre: string;
  edad: number;
  email:string;
}
 
@Component({
  selector: 'app-ejemplo1',
  templateUrl: './ejemplo1.component.html',
  styleUrl: './ejemplo1.component.css'
})
export class Ejemplo1Component implements OnInit {
 
  formGroup!: FormGroup;
 
  nombre: string="Alicia"
 
  persona:Usuario={
    nombre:'',
    edad:0,
    email: ''
  }
 
  constructor(private readonly fb: FormBuilder){}
 
  ngOnInit(): void {
    this.formGroup= this.initForm();
  }
 
  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
      edad:[''],
      email:[''],
    })
  }
 
  onSubmit():void{
    const {nombre, edad, email}= this.formGroup.value; //Desestructuración de arreglos
    this.persona.nombre=nombre
    this.persona.edad=edad //Esta sobreescribiendo el objeto colocandole el valor que se va a escribir en cada uno de los campos en el form
    this.persona.email=email
 
    let personaJSON= JSON.stringify(this.persona);
 
    //localStorage.setItem("nombre",this.nombre); //Se almacena el nombre en un local storage, es el almacenamiento local en el navegador
    localStorage.setItem("persona",personaJSON);  
  }
 
  subImprime():void{
    const usuarioGuardado = localStorage.getItem('persona');
    if(usuarioGuardado){
      const usuarioRecuperado: Usuario = JSON.parse(usuarioGuardado);
      this.persona = usuarioRecuperado
    }
  }
 
}