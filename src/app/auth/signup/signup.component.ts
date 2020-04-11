import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UserData } from '../user-data.model';
import { CoachData } from '../coach-data.model';
import { mimeType } from '../../utils/mime-type.validator';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  styleUrls  : ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;

  isChecked = false;

  form: FormGroup;

  fileIsTooBig = false;

  imagePreview: string;

  private authStatus: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authStatus = this.authService
      .getAuthStatusListener()
      .subscribe(() => {
        this.isLoading = false;
      });
    this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
      firstName  : new FormControl(),
      lastName   : new FormControl(),
      displayName: new FormControl(),
      isCoach    : new FormControl(),
      image      : new FormControl({
        asyncValidators: mimeType,
      }),
      cbu        : new FormControl(),
      description: new FormControl(),
    });
  }

  async onSignup() {
    const isValid = this.validateForm();

    if (isValid) {
      this.isLoading = true;

      const coachData: CoachData = {
        displayName: this.form.value.displayName,
        cbu        : this.form.value.cbu,
        description: this.form.value.description,
      };

      const coachDataExists = this.isChecked;

      const userData: UserData = {
        firstName: this.form.value.firstName,
        lastName : this.form.value.lastName,
        email    : this.form.value.email,
        password : this.form.value.password,
        image    : this.form.value.image,
        coachData: coachDataExists ? coachData : undefined,
      };

      await this.authService.createUser(userData);
      const user = await this.authService.login(userData.email, userData.password);
      await this.authService.createProfilePicture(user.id, userData.image);

      this.router.navigate(['/']);
    }
  }

  private validateForm() {
    const isCoach = this.form.value.isCoach;

    if (isCoach) {
      const displayName = this.form.get('displayName');
      const cbu = this.form.get('cbu');
      const description = this.form.get('description');

      const displayNameIsInvalid =
        displayName.value === '' || typeof displayName.value !== 'string';

      const cbuIsInvalid = cbu.value === '' || typeof cbu.value !== 'string';

      const descriptionIsInvalid =
        description.value === '' || typeof description.value !== 'string';

      if (displayNameIsInvalid) {
        displayName.setErrors({
          invalid: true,
        });

        return false;
      }
      if (cbuIsInvalid) {
        cbu.setErrors({
          invalid: true,
        });

        return false;
      }
      if (descriptionIsInvalid) {
        description.setErrors({
          invalid: true,
        });

        return false;
      }
    } else {
      const firstName = this.form.get('firstName');
      const lastName = this.form.get('lastName');

      const firstNameIsInvalid =
        firstName.value === '' || typeof firstName.value !== 'string';
      const lastNameIsInvalid =
        lastName.value === '' || typeof lastName.value !== 'string';

      if (firstNameIsInvalid) {
        firstName.setErrors({ invalid: true, });
        return false;
      }

      if (lastNameIsInvalid) {
        lastName.setErrors({ invalid: true, });
        return false;
      }
    }

    return true;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file, });
    this.form.get('image').updateValueAndValidity();
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
