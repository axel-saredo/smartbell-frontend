import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Coach } from "./coach.model";

const BACKEND_AUTH = environment.authUrl;
const BACKEND_API = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class CoachesService {
  private coaches: Coach[] = [];

  private coachesUpdated = new Subject<{
    coaches: Coach[];
    coachCount: number;
  }>();

  constructor(private http: HttpClient) {}

  getCoaches(coachesPerPage: number, page: number) {
    const offset = this.calculateOffset(coachesPerPage, page);
    const queryParams = `?limit=${coachesPerPage}&offset=${offset}`;
    this.http
      .get<{ count: number; rows: any[] }>(BACKEND_API + "/coach" + queryParams)
      .pipe(
        map(coachesData => {
          return {
            coaches: coachesData.rows.map((coach: Coach) => {
              return {
                id: coach.id,
                displayName: coach.displayName,
                description: coach.description,
                imagePath: coach.imagePath
              };
            }),
            maxCoaches: coachesData.count
          };
        })
      )
      .subscribe(transformedCoachData => {
        this.coaches = transformedCoachData.coaches;
        this.coachesUpdated.next({
          coaches: [...this.coaches],
          coachCount: transformedCoachData.maxCoaches
        });
      });
  }

  getCoachProfilePicture(userId: string, httpOptions: {headers: HttpHeaders}) {
    return this.http.get<any>(BACKEND_API + "/files/profile-picture/" + userId, httpOptions);
  }

  getCoachUpdateListener() {
    return this.coachesUpdated.asObservable();
  }

  getCoach(id: string) {
    return this.http.get<any>(BACKEND_AUTH + id);
  }

  calculateOffset(coachesPerPage: number, page: number) {
    const offset = coachesPerPage * (page - 1);
    return offset;
  }
}
