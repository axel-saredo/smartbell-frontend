import { Component, OnInit } from '@angular/core';
import { Program } from '../../program.model';
import { environment } from '../../../../environments/environment';
import { ProgramsService } from '../../programs.service';
import { PageEvent } from '@angular/material/paginator';
import { FindAndCount } from '../../../utils/types';

@Component({
  selector   : 'app-programs-list-page',
  templateUrl: './programs-list.page.html',
  styleUrls  : ['./programs-list.page.css'],
})
export class ProgramsListPage implements OnInit {
  isLoading = false;

  IMAGE_PATH = `${environment.apiUrl}/files/program-picture/`;

  programs: Program[] = [];

  totalPrograms = 0;

  programsPerPage = 9;

  currentPage = 1;

  pageSizeOptions = [1, 2, 5, 10];

  constructor(public programsService: ProgramsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchPrograms();
  }

  onChangedPage(pageData: PageEvent): void {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.programsPerPage = pageData.pageSize;
    this.programsService.getPrograms(this.programsPerPage, this.currentPage);
  }

  fetchPrograms(): void {
    this.programsService
      .getPrograms(this.programsPerPage, this.currentPage)
      .subscribe((programData: FindAndCount<Program>) => {
        this.totalPrograms = programData.count;
        this.programs = programData.rows;
        this.isLoading = false;
      });
  }
}
