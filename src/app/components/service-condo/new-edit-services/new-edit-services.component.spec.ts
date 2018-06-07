import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditServicesComponent } from './new-edit-services.component';

describe('NewEditServicesComponent', () => {
  let component: NewEditServicesComponent;
  let fixture: ComponentFixture<NewEditServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
