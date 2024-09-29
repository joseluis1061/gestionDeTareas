import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/service/task.service';
import { ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/models/task.model';

interface TaskFormData {
  taskName: string;
  date: Date;
  persons: PersonFormData[];
}

interface PersonFormData {
  personName: string;
  age: number;
  personSkills: string[];
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  // Declara e Inicializamos la variable
  public formTask: FormGroup = new FormGroup({});
  taskUpdate!: ITask;

  constructor(
    private taskService:TaskService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    // this.taskUpdate = this.route.snapshot.data['state'].task;
    // console.log("Actualizar: ", this.taskUpdate);
    this.initFormTask();
  }

  initFormTask(): void {
    // Valores de la propiedad repetitiva se inicializa
    this.formTask = new FormGroup({
      taskName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      taskDate: new FormControl('', [Validators.required]),
      persons: new FormArray([], [Validators.required, this.validateUniqueNames.bind(this)]) //Esta es la propiedad variable en datos
    });
  }

  // Este inicializa los valores del formulario dinamico
  // Cada vez que se llame me agregara un nuevo campo con estas propiedades
  initFormPerson(): FormGroup {
    // Retorna el formulario que estará anidado
    return new FormGroup({
      personName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      personSkills: new FormArray([], [Validators.required, Validators.minLength(1)])
    });
  }

  //Agrega un nuevo formulario anidado de Persona
  addPerson(): void {
    // Llama por referencia el input del formulario padre que es un array
    const refPersons = this.formTask.get('persons') as FormArray;
    // Para poder agregarle nuevos valores de formulario dinamico
    // Cada vez que se llama le inyecta un nuevo campo de skills
    refPersons.push(this.initFormPerson());
  }

  deletePerson(index: number): void {
    // Obtener una referencia al FormArray de personas
    const personsFormArray = this.formTask.get('persons') as FormArray;
    // Remover el elemento en el índice especificado
    personsFormArray.removeAt(index);
  }

  // Agrega un formulario anidado para Skill
  addSkill(index: number) {
    const personFormArray = this.formTask.get('persons') as FormArray;
    const personFormGroup = personFormArray.at(index) as FormGroup;
    const skillsFormArray = personFormGroup.get('personSkills') as FormArray;
    skillsFormArray.push(new FormControl('', [Validators.required, Validators.min(3)]));
  }

  initFormSkill(): FormGroup {
    // Retorna el formulario que estará anidado
    return new FormGroup({
      skill: new FormControl('', [Validators.required])
    });
  }

  removeSkill(indexPerson: number, indexSkill: number) {
    const personFormArray = this.formTask.get('persons') as FormArray;
    const personFormGroup = personFormArray.at(indexPerson) as FormGroup;
    const skillsFormArray = personFormGroup.get('personSkills') as FormArray;
    skillsFormArray.removeAt(indexSkill);
  }

  // Referencia cada campo que se crea en el html para
  // poder acceder a sus propiedades y manipularlo
  getCtrl(key: string, form: FormGroup): any {
    return form.get(key);
  }

  // Validador personalizado para verificar el formato de fecha DD/MM/AAAA
  dateValidator(control: FormControl): ValidationErrors | null  {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(control.value) ? null : { fechaInvalida: true };
  }

  validateUniqueNames(control: FormArray): ValidationErrors | null {
    const personNames = control.controls.map(personForm => personForm.get('personName')?.value);
    const uniqueNames = [...new Set(personNames)];

    return uniqueNames.length < control.length ? { duplicateNames: true } : null;
  }

  onSubmit() {
    // TODO: Usar EventEmitter con valor de formulario
    console.log("ENVIAR")
    // console.warn(this.formTask.value);

    if (this.formTask.valid) {
      const taskData = this.formTask.value;
      taskData.complete = false;
      this.taskService.createTask(taskData)
        .subscribe({
          next: (response) => {
            console.log('Tarea creada exitosamente?:', response);
            this.taskService.addTask(response);
          },
          error: (error) => {
          console.error('Error al crear la tarea:', error);
        }
      });
    }
  }
}
