import { CoachData } from './coach-data.model';

export interface UserData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: File;
  coachData?: CoachData;
}
