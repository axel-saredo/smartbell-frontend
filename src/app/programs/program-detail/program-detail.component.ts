import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ProgramsService } from "../programs.service";
import { Program } from "../program.model";

@Component({
  selector: "app-program-detail",
  templateUrl: "./program-detail.component.html",
  styleUrls: ["./program-detail.component.css"]
})
export class ProgramDetailComponent implements OnInit {
  program: Program;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private programsService: ProgramsService
  ) {}

  ngOnInit() {
    let programId = this.route.snapshot.paramMap.get("id");

    this.programsService.getProgram(programId);
  }
}
