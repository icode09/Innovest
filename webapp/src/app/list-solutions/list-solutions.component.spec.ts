import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSolutionsComponent } from './list-solutions.component';

describe('ListSolutionsComponent', () => {
  let component: ListSolutionsComponent;
  let fixture: ComponentFixture<ListSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSolutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
