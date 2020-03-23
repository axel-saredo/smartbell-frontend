import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CoachesService } from "../coaches.service";
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from "src/app/auth/auth.service";
import { Coach } from "../coach.model";

@Component({
  selector: "app-coach-list",
  templateUrl: "./coaches-list.component.html",
  styleUrls: ["./coaches-list.component.css"]
})
export class CoachesListComponent implements OnInit, OnDestroy {
  coaches: Coach[] = [];

  isLoading = false;

  totalCoaches = 0;

  coachesPerPage = 10;

  currentPage = 1;

  pageSizeOptions = [1, 2, 5, 10];

  userIsAuthenticated = false;

  userId: string;

  private coachesSub: Subscription;

  private authStatusSub: Subscription;

  constructor(
    public coachesService: CoachesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.coachesService.getCoaches(this.coachesPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.coachesSub = this.coachesService
      .getCoachUpdateListener()
      .subscribe((coachData: { coaches: Coach[]; coachCount: number }) => {
        this.isLoading = false;
        this.totalCoaches = coachData.coachCount;
        this.coaches = coachData.coaches;
      });
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
    this.coachesPerPage = pageData.pageSize;
    this.coachesService.getCoaches(this.coachesPerPage, this.currentPage);
  }

  ngOnDestroy(): void {
    this.coachesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
