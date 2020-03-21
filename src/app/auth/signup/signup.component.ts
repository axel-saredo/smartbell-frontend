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
  private authStatus: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authStatus = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.buildForm();
    this.setValidatorsForNames();
  }

  private buildForm() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      firstName: new FormControl(null, { validators: [Validators.required] }),
      lastName: new FormControl(null, { validators: [Validators.required] }),
      displayName: new FormControl(null),
      isCoach: new FormControl(),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: mimeType
      })
    });
  }

  private setValidatorsForNames() {
    const displayName = this.form.get("displayName");
    const firstName = this.form.get("firstName");
    const lastName = this.form.get("lastName");

    this.form.get("isCoach").valueChanges.subscribe(isCoach => {
      if (!!isCoach) {
        displayName.setValidators([Validators.required]);
        firstName.setValidators(null);
        lastName.setValidators(null);
      } else {
        displayName.setValidators(null);
      }

      displayName.updateValueAndValidity();
      firstName.updateValueAndValidity();
      lastName.updateValueAndValidity();
    });
  }

  onSignup() {
    if (this.form.invalid) {
      return;
    }
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
