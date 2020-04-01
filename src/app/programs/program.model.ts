import { CoachData } from "../auth/coach-data.model";

export interface Program {
  id: string;
  title: string;
  description: string;
  coach?: CoachData;
  pictureId: string;
}
