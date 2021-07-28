import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionFormComponent } from './solution-form.component';

describe('SolutionFormComponent', () => {
  let component: SolutionFormComponent;
  let fixture: ComponentFixture<SolutionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
