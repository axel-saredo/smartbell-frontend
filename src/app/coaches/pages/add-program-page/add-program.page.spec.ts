/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramPage } from './add-program.page';

describe('AddProgramPageComponent', () => {
  let component: AddProgramPage;
  let fixture: ComponentFixture<AddProgramPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProgramPage],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
