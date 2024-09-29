import {IPerson} from "./person.model";
export interface ITask {
  id: number;
  taskName: string;
  complete: boolean;
  taskDate: string;
  persons: IPerson[];
}
