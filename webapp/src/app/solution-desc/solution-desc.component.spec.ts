import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionDescComponent } from './solution-desc.component';

describe('SolutionDescComponent', () => {
  let component: SolutionDescComponent;
  let fixture: ComponentFixture<SolutionDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
