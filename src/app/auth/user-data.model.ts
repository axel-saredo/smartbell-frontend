import { CoachData } from "./coach-data.model";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  coachData?: CoachData;
}
