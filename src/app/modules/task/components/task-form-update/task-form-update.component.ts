import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/service/task.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ITask } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-form-update',
  templateUrl: './task-form-update.component.html',
  styleUrls: ['./task-form-update.component.scss']
})
export class TaskFormUpdateComponent implements OnInit, AfterViewInit{
  public formTask: FormGroup = new FormGroup({});
  taskData!: ITask;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ){
    this.route.params.subscribe((response: Params) => {
      console.log("ID: ", response['id']);
      const id = response['id'];
      this.getTaskById(id);
    })
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

  }

  getTaskById(id: string){
    this.taskService.getTasksById(parseInt(id)).subscribe({
      next: (response) => {
        this.taskData = response[0];
        console.log("TAREA: ", this.taskData);
        this.initFormTask();
      },
      error: error => console.log("Error llamando a tarea by id: ", error)
    });
  }

  initFormTask(){
    this.formTask = this.fb.group({
      taskName: [this.taskData.taskName, [Validators.required, Validators.minLength(5)]],
      taskDate: [this.taskData.taskDate, [Validators.required]], //, this.dateValidator.bind(this)
      persons: this.fb.array([], [Validators.required])
    })
    if(this.taskData.persons.length > 0 ){
      this.taskData.persons.forEach(person => {
        this.addPerson(person);
      });
    }
  }

  initFormPerson(person: any){
    const personsForm = this.fb.group({
      personName: [person.personName, [Validators.required, Validators.minLength(2)]],
      age: [person.age, [Validators.required, Validators.min(18)]],
      personSkills: this.fb.array([], [Validators.required, Validators.minLength(1)])
    })
    if(person.personSkills.length > 0){
      const skillsFormArray = personsForm.get('personSkills') as FormArray;
      person.personSkills.forEach((skill: any, index:number) => {
        skillsFormArray.push(this.fb.control(skill, Validators.required));
      })
    }
    return personsForm;
  }

  addPerson(person: any): void {
    const refPersons = this.formTask.get('persons') as FormArray;
    refPersons.push(this.initFormPerson(person));
  }

  deletePerson(index: number): void {
    const personsFormArray = this.formTask.get('persons') as FormArray;
    personsFormArray.removeAt(index);
  }

  initSkills(){
    const skillForm = this.fb.group({
      skill: ['', [Validators.required]]
    })
    return skillForm;
  }

  addSkill(index: number, skill: any) {
    const personFormArray = this.formTask.get('persons') as FormArray;
    const personFormGroup = personFormArray.at(index) as FormGroup;
    const skillsFormArray = personFormGroup.get('personSkills') as FormArray;
    skillsFormArray.push(new FormControl(skill, [Validators.required]));
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

  onSubmit(){
    console.log("Enviar Actualizacion: ", this.formTask.value)
  }

}
