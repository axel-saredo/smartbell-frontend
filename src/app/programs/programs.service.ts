import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Program } from './program.model';
import { FindAndCount } from '../utils/types';

const BACKEND_API = environment.apiUrl;

@Injectable({ providedIn: 'root', })
export class ProgramsService {

  constructor(private http: HttpClient) {}

  getPrograms(programsPerPage: number, page: number): Observable<FindAndCount<Program>> {
    const offset = this.calculateOffset(programsPerPage, page);
    const queryParams = `?limit=${programsPerPage}&offset=${offset}`;
    const url = BACKEND_API + '/program' + queryParams;
    return this.http.get<FindAndCount<Program>>(url);
  }

  getProgram(programId: string): Observable<Program> {
    const url = `${BACKEND_API}'/program/${programId}`;
    return this.http.get<any>(url);
  }

  calculateOffset(programsPerPage: number, page: number): number {
    const offset = programsPerPage * (page - 1);
    return offset;
  }

  createProgram(coachId: string, programData: Partial<Program>): Observable<Program> {
    const url = `${BACKEND_API}/coach/${coachId}/program`;
    return this.http.post<Program>(url, programData);
  }

  uploadProgramPicture(programId: string, image: File): Observable<Object> {
    const url = `${BACKEND_API}/program/${programId}/picture`;
    const formData = new FormData();
    formData.append('file', image, image.name);
    return this.http.put(url, formData);
  }

  uploadProgramPreview(programId: string, video: File): Observable<Object> {
    const url = `${BACKEND_API}/program/${programId}/preview`;
    const formData = new FormData();
    formData.append('file', video, video.name);
    return this.http.put(url, formData);
  }
}
