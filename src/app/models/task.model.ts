import {IPerson} from "./person.model";
export interface ITask {
  id: number;
  title: string;
  complete: boolean;
  persons: IPerson[];
}
