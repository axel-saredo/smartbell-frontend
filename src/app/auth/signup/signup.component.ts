import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { UserData } from "../user-data.model";
import { CoachData } from "../coach-data.model";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  isChecked = false;
  private authStatus: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authStatus = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;

    const coachData: CoachData = {
      displayName: form.value.displayName
    };

    const coachDataExists = Boolean(form.value.displayName);

    const user: UserData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password,
      coachData: coachDataExists ? coachData : { displayName: "" }
    };

    this.authService.createUser(user);
  }

  onToggle(isChecked: boolean) {
    this.isChecked = !isChecked;
  }

  ngOnDestroy(): void {
    this.authStatus.unsubscribe();
  }
}
