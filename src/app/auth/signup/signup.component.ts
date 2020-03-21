import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { UserData } from "../user-data.model";
import { CoachData } from "../coach-data.model";
import { mimeType } from "src/app/coaches/post-create/mime-type.validator";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  isChecked = false;
  form: FormGroup;
  fileIsTooBig = false;
  imagePreview: string;
  firstNameIsInvalid: Boolean;
  lastNameIsInvalid: Boolean;
  displayNameIsInvalid: Boolean;
  private authStatus: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authStatus = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      firstName: new FormControl(),
      lastName: new FormControl(),
      displayName: new FormControl(),
      isCoach: new FormControl(),
      image: new FormControl({
        asyncValidators: mimeType
      })
    });
  }

  onSignup() {
    const isValid = this.validateForm();

    if (isValid) {
      this.isLoading = true;

      const coachData: CoachData = {
        displayName: this.form.value.displayName
      };

      const coachDataExists = this.isChecked;

      const user: UserData = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        password: this.form.value.password,
        coachData: coachDataExists ? coachData : undefined
      };

      this.authService.createUser(user);
    }
  }

  validateForm() {
    const isCoach = this.form.value.isCoach;
    debugger;
    if (isCoach) {
      const displayName = this.form.get("displayName");
      this.displayNameIsInvalid =
        displayName.value === "" || typeof displayName.value !== "string";
      if (this.displayNameIsInvalid) {
        displayName.setErrors({
          invalid: true
        });

        return false;
      }
    } else {
      const firstName = this.form.get("firstName");
      const lastName = this.form.get("lastName");

      this.firstNameIsInvalid =
        firstName.value === "" || typeof firstName.value !== "string";
      this.lastNameIsInvalid =
        lastName.value === "" || typeof lastName.value !== "string";

      if (this.firstNameIsInvalid || this.lastNameIsInvalid) {
        firstName.setErrors({ invalid: true });
        lastName.setErrors({ invalid: true });

        return false;
      }
    }

    return true;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (file.size > 2000000) {
        this.fileIsTooBig = true;
      }
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onToggle(isChecked: boolean) {
    this.isChecked = !isChecked;
  }

  ngOnDestroy(): void {
    this.authStatus.unsubscribe();
  }
}
