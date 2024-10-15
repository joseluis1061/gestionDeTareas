import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/service/task.service';
import { ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/models/task.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { IPerson } from 'src/app/models/person.model';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  faTrash = faTrash;
  public formTask: FormGroup = new FormGroup({});
  taskUpdate: ITask | null = null;
  title: string = "Crear tarea";
  titlePersons: string = "Personas encargadas";
  titleSkills: string = "Habilidades";

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.taskService.taskSelectedState$.subscribe({
      next: param => {
        this.taskUpdate = param;
        console.log("Update: ",this.taskUpdate);
        console.log("Update: ",this.taskUpdate? true: false);
      },
      error: error => console.log("Algo salio mal en la actualización")
    });

    if(this.taskUpdate !== null){
      console.log("Update formulario---");
      //this.formTask.patchValue(this.taskUpdate);
      this.initFormTask();
    }else{
      console.log("Crear el formulario");
      this.initFormTask();
    }
  }

  initFormTask(): void {

    this.formTask = new FormGroup({
      taskName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      taskDate: new FormControl('', [Validators.required]), //, this.dateValidator.bind(this)
      persons: new FormArray([], [Validators.required, this.validateUniqueNames.bind(this)])
    });
  }

  initFormPerson(): FormGroup {
    return new FormGroup({
      personName: new FormControl('', [Validators.required, Validators.minLength(2), this.validateUniqueNames.bind(this)]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      personSkills: new FormArray([], [Validators.required, Validators.minLength(1)])
    });
  }

  //Agrega un nuevo formulario anidado de Persona
  addPerson(): void {
    const refPersons = this.formTask.get('persons') as FormArray;
    refPersons.push(this.initFormPerson());
  }

  deletePerson(index: number): void {
    const personsFormArray = this.formTask.get('persons') as FormArray;
    personsFormArray.removeAt(index);
  }

  // Agrega un formulario anidado para Skill
  addSkill(index: number) {
    const personFormArray = this.formTask.get('persons') as FormArray;
    const personFormGroup = personFormArray.at(index) as FormGroup;
    const skillsFormArray = personFormGroup.get('personSkills') as FormArray;
    skillsFormArray.push(new FormControl([], [Validators.required]));
  }

  initFormSkill(): FormGroup {
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

  // Referencia cada campo que se crea en el html
  getCtrl(key: string, form: FormGroup): any {
    return form.get(key);
  }

  // Validador personalizado para verificar el formato de fecha DD/MM/AAAA
  dateValidator(control: FormControl): ValidationErrors | null  {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(control.value) ? null : { fechaInvalida: true };
  }

  validateUniqueNames(): ValidationErrors | null {
    const persons = this.formTask.get('persons') as FormArray;
    if (persons && persons.length > 0) {
      const existingNames = persons.controls.map(personForm => personForm.get('personName')?.value);
      const uniqueNames = [...new Set(existingNames)];
      this.titlePersons= "Personas encargadas";
      return uniqueNames.length < persons.length ? { duplicateNames: true } : null;
    }
    this.titlePersons= "Debes agregar al menos una persona";
    return null;
  }

  validateOneSkill(): ValidationErrors | null {
    const persons = this.formTask.get('persons') as FormArray;

    if (persons && persons.length > 0) {
      const existingNames = persons.controls.map(personForm => personForm.get('personSkills') as FormArray);
      console.log("Skills", existingNames.length)
      return existingNames.length > 0? {oneSkill: true} : null;
    }
    this.titleSkills= "Habilidades";
    return null;
  }

  onSubmit() {
    if (!this.formTask.valid) {
      alert("Verifica tus campos");
      return;
    }
    const taskData = this.formTask.value;
    taskData.complete = false;
    this.taskService.createTask(taskData)
      .subscribe({
        next: (response) => {
          console.log('Tarea creada exitosamente?:', response);
          this.taskService.addTask(response);
          this.initFormTask();
          this.initFormPerson();
          this.initFormSkill();
        },
        error: (error) => {
          alert("Verifica tus campos");
          console.error('Error al crear la tarea:', error);
        }
    });
  }
}

// Update
// updateFormTask(): void {
//   this.formTask = new FormGroup({
//     taskName: new FormControl(this.taskUpdate?.taskName, [
//       Validators.required,
//       Validators.minLength(3),
//     ]),
//     taskDate: new FormControl(this.taskUpdate?.taskDate, [Validators.required]),
//     persons: new FormArray([], [Validators.required, this.validateUniqueNames.bind(this)])
//   });
// }

// updateFormPerson() {
//   this.taskUpdate?.persons.forEach(person => {
//     return new FormGroup({
//       personName: new FormControl(person.personName, [Validators.required]),
//       age: new FormControl(person.age, [Validators.required, Validators.min(18)]),
//       personSkills: new FormArray([], [Validators.required, Validators.minLength(1)])
//     });
//   })

// }

// updateFormSkill() {
//   this.taskUpdate?.persons.forEach(person => {
//     return new FormGroup({
//       skill: new FormControl(person.personSkills, [Validators.required])
//     });
//   })
// }
