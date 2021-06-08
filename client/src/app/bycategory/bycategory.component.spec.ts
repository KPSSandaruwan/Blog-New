import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BycategoryComponent } from './bycategory.component';

describe('BycategoryComponent', () => {
  let component: BycategoryComponent;
  let fixture: ComponentFixture<BycategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BycategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
