import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProgramsService } from '../../programs.service';
import { Program } from '../../program.model';
import { Observable } from 'rxjs';
import { merge } from 'rxjs/operators';

@Component({
  selector   : 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls  : ['./add-program.component.css'],
})
export class AddProgramComponent implements OnInit {

  @Input()
  coachId: string;

  form: FormGroup;

  imageWasAdded = false;

  videoWasAdded = false;

  imageString: string;

  videoString: string;

  image: File;

  video: File;

  @Output()
  loading: EventEmitter<boolean> = new EventEmitter(false);

  @Output()
  creationSucceeded: EventEmitter<void> = new EventEmitter();

  @Output()
  creationFailed: EventEmitter<void> = new EventEmitter();

  @Output()
  filesFailed: EventEmitter<void> = new EventEmitter();

  constructor(
    private programServie: ProgramsService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title      : new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      image      : new FormControl(null, [Validators.required]),
      preview    : new FormControl(null, [Validators.required]),
    });
  }

  handleImageInput(files: any): void {
    this.imageWasAdded = files.length > 0;
    if (this.imageWasAdded) {
      const file = files[0];
      this.image = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imageString = reader.result as string;
      };
    }
  }

  handleVideoInput(files: any): void {
    this.videoWasAdded = files.length > 0;
    if (this.videoWasAdded) {
      const file = files[0];
      this.video = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.videoString = reader.result as string;
      };
    }
  }

  onSubmit(form: ProgramForm): void {
    this.loading.emit(true);
    const dto = {
      title      : form.title,
      description: form.description,
    };
    this.programServie.createProgram(this.coachId, dto)
      .subscribe(
        () => this.handleProgramCreationResponse,
        () => {
          this.creationFailed.emit();
          this.loading.emit(false);
        });
  }

  private handleProgramCreationResponse(program: Program): void {
    const obs1 = this.uploadImage(program.id);
    const obs2 = this.uploadVideo(program.id);
    const both = obs1.pipe(merge(obs2));
    both.subscribe(
      () => this.creationSucceeded.emit(),
      () => this.filesFailed.emit(),
      () => this.loading.emit(false)
    );
  }

  uploadImage(programId: string): Observable<object> {
    return this.programServie.uploadProgramPicture(programId, this.image);
  }

  uploadVideo(programId: string): Observable<object> {
    return this.programServie.uploadProgramPreview(programId, this.image);
  }
}

interface ProgramForm {
  title: string;
  description: string;
  image: string;
  preview: string;
}
