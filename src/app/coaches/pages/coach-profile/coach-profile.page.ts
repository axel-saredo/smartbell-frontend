import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachesService } from '../../coaches.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector   : 'app-coach-profile-page',
  templateUrl: './coach-profile.page.html',
  styleUrls  : ['./coach-profile.page.css'],
})
export class CoachProfilePage implements OnInit {
  coachId: string;

  userData: any;

  coachData: any;

  programs: any[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: CoachesService,
    private authService: AuthService
  ) {
    this.coachId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.service.getCoach(this.coachId)
      .subscribe((coachData) => {
        this.coachData = coachData;
        this.coachId = coachData.id;
        this.userData = coachData.userData;
        this.programs = coachData.programs;
        this.programs.map((program) => program.coach = coachData);
      });
  }

  navigateToAddProgram(): void {
    this.router.navigate(['add-program'], { relativeTo: this.activatedRoute, });
  }

  isCurrentUserProfile(): boolean {
    const user = this.authService.getUser();
    const isCurrentUserProfile = user && user.coachData && user.coachData.id === this.coachId;
    return isCurrentUserProfile;
  }
}
