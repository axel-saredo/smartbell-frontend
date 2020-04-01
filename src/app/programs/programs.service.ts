import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Program } from "./program.model";

const BACKEND_API = environment.apiUrl;

@Injectable({ providedIn: "root" })
export class ProgramsService {
  private programs: Program[] = [];

  private programsUpdated = new Subject<{
    programs: Program[];
    programCount: number;
  }>();

  constructor(private http: HttpClient) {}

  getPrograms(programsPerPage: number, page: number) {
    const offset = this.calculateOffset(programsPerPage, page);
    const queryParams = `?limit=${programsPerPage}&offset=${offset}`;
    this.http
      .get<{ count: number; rows: any[] }>(
        BACKEND_API + "/program" + queryParams
      )
      .pipe(
        map(programsData => {
          return {
            programs: programsData.rows.map((program: Program) => {
              return {
                id: program.id,
                title: program.title,
                description: program.description,
                pictureId: program.pictureId
              };
            }),
            maxPrograms: programsData.count
          };
        })
      )
      .subscribe(transformedProgramData => {
        this.programs = transformedProgramData.programs;
        this.programsUpdated.next({
          programs: [...this.programs],
          programCount: transformedProgramData.maxPrograms
        });
      });
  }

  getProgram(programId: string) {
    return this.http.get<any>(BACKEND_API + "/program/" + programId);
  }

  getProgramUpdateListener() {
    return this.programsUpdated.asObservable();
  }

  calculateOffset(programsPerPage: number, page: number) {
    const offset = programsPerPage * (page - 1);
    return offset;
  }
}
