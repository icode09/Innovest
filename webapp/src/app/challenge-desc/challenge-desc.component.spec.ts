import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDescComponent } from './challenge-desc.component';

describe('ChallengeDescComponent', () => {
  let component: ChallengeDescComponent;
  let fixture: ComponentFixture<ChallengeDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
