import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ProgramsService } from "../programs.service";
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from "src/app/auth/auth.service";
import { Program } from "../program.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-program-list",
  templateUrl: "./programs-list.component.html",
  styleUrls: ["./programs-list.component.css"]
})
export class ProgramsListComponent implements OnInit, OnDestroy {
  IMAGE_PATH = `${environment.apiUrl}/files/program-picture/`;

  programs: Program[] = [];

  isLoading = false;

  totalPrograms = 0;

  programsPerPage = 9;

  currentPage = 1;

  pageSizeOptions = [1, 2, 5, 10];

  userIsAuthenticated = false;

  userId: string;

  private programsSub: Subscription;

  private authStatusSub: Subscription;

  constructor(
    public programsService: ProgramsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.programsService.getPrograms(this.programsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.programsSub = this.programsService
      .getProgramUpdateListener()
      .subscribe(
        (programData: { programs: Program[]; programCount: number }) => {
          this.isLoading = false;
          this.totalPrograms = programData.programCount;
          this.programs = programData.programs;
        }
      );
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.programsPerPage = pageData.pageSize;
    this.programsService.getPrograms(this.programsPerPage, this.currentPage);
  }

  ngOnDestroy(): void {
    this.programsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
