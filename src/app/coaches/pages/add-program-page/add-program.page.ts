import { Component, OnInit } from '@angular/core';
import { Program } from '../../../programs/program.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector   : 'app-add-program-page',
  templateUrl: './add-program.page.html',
  styleUrls  : ['./add-program.page.css'],
})
export class AddProgramPage implements OnInit {
  coachId: string;

  program: Program;

  loading: boolean;

  success: boolean = false;

  programFailed: boolean = false;

  filesFailed: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.coachId = params['id'];
    });
  }

  handleCreationSucceeded(): void {
    this.success = true;
  }

  handleCreationFailed(): void {
    this.programFailed = true;
  }

  handleFilesFailed(): void {
    this.filesFailed = true;
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }
}
