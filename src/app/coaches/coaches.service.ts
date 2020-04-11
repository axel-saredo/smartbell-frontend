import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const BACKEND_API = environment.apiUrl;

@Injectable({ providedIn: 'root', })
export class CoachesService {
  constructor(private http: HttpClient) {}

  // TODO: Type this
  getCoach(id: string): Observable<any> {
    return this.http.get<any>(BACKEND_API + '/coach/' + id);
  }
}
