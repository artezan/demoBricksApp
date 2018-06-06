import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditPropietariesComponent } from './new-edit-propietaries.component';

describe('NewEditPropietariesComponent', () => {
  let component: NewEditPropietariesComponent;
  let fixture: ComponentFixture<NewEditPropietariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditPropietariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditPropietariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
