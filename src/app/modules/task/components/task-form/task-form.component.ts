import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
 // Declara e Inicializamos la variable
 public formTask: FormGroup = new FormGroup({});

 ngOnInit(): void {
   this.initFormTask();
 }

 initFormTask(): void{
   // Valores de la propiedad repetitiva se inicializa
   this.formTask = new FormGroup(
     {
       taskName: new FormControl('', [Validators.required, Validators.minLength(5)]),
       date: new FormControl('', [Validators.required]),
       persons:  new FormArray([], [Validators.required]), //Esta es la propiedad variable en datos
     }
   )
 }

 // Este inicializa los valores del formulario dinamico
 // Cada vez que se llame me agregara un nuevo campo con estas propiedades
 initFormPerson(): FormGroup {
  // Retorna el formulario que estará anidado
   return  new FormGroup(
     {
       personName:   new FormControl('', [Validators.required]),
       age: new FormControl(''),
       personSkills: new FormControl('', [Validators.required]),
     }
   )
 }

 //Agrega un nuevo formulario anidado
 addPerson(): void {
   // Llama por referencia el input del formulario padre que es un array
   const refSkills = this.formTask.get('persons') as FormArray;
   // Para poder agregarle nuevos valores de formulario dinamico
   // Cada vez que se llama le inyecta un nuevo campo de skills
   refSkills.push(this.initFormPerson());
 }

 deletePerson(index: number): void {
  // Obtener una referencia al FormArray de personas
  const personsFormArray = this.formTask.get('persons') as FormArray;

  // Remover el elemento en el índice especificado
  personsFormArray.removeAt(index);
}

 // Referencia cada campo que se crea en el html para
 // poder acceder a sus propiedades y manipularlo
 getCtrl(key: string, form: FormGroup): any{
   return form.get(key);
 }

 // Tenemos el indice del input
 // Y la propiedad que deseamos modificar
 removeValidation(index: number, key: string): void {
   // Del elemento padre llamo por referencia el campo que deseo modificar
   // Como es dinamico deben ser FormArray. En este caso el array de skills
   // Para poder trabajar con su parametros nativos
   const refParent = this.formTask.get('persons') as FormArray;
   const refSingle = refParent.at(index).get(key) as FormGroup;
   refSingle.clearValidators();
   refSingle.updateValueAndValidity();
 }

 //TODO: Agregar validaciones
 addValidation(index: number, key: string): void {
   const refParent = this.formTask.get('persons') as FormArray;
   const refSingle = refParent.at(index).get(key) as FormGroup;
   refSingle.setValidators(
     [
       Validators.required,
       Validators.email,
       Validators.minLength(5)
     ]
   )
   refSingle.updateValueAndValidity();
 }

}
