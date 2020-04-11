import { Component, Input, OnInit } from '@angular/core';
import { URLResolverService } from '../../../utils/url-resolver.service';

@Component({
  selector   : 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls  : ['./coach-profile.component.css'],
})
export class CoachProfileComponent implements OnInit {

  @Input()
  coachData: any;

  profilePictureUrl: string;

  constructor(
    private urlResolver: URLResolverService
  ) {}

  ngOnInit() {
    const { userData, } = this.coachData;
    this.profilePictureUrl = this.urlResolver.getProfilePictureURL(userData.id);
  }
}
