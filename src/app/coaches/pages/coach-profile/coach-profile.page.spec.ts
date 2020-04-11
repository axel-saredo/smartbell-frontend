/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoachProfilePage } from './coach-profile.page';

describe('CoachProfilePageComponent', () => {
  let component: CoachProfilePage;
  let fixture: ComponentFixture<CoachProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoachProfilePage],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
