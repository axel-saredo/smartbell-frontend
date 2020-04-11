import { Component, Input } from '@angular/core';
import { Program } from '../../program.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector   : 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls  : ['./programs-list.component.css'],
})
export class ProgramsListComponent {
  IMAGE_PATH = `${environment.apiUrl}/files/program-picture/`;

  @Input()
  programs: Program[] = [];
}
