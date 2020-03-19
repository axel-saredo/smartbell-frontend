import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { UserData } from "../user-data.model";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatus: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authStatus = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const user: UserData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password
    };
    this.isLoading = true;
    this.authService.login(user);
  }

  ngOnDestroy(): void {
    this.authStatus.unsubscribe();
  }
}
