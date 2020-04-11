/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsListPage } from './programs-list.page';

describe('ProgramListPageComponent', () => {
  let component: ProgramsListPage;
  let fixture: ComponentFixture<ProgramsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramsListPage],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
