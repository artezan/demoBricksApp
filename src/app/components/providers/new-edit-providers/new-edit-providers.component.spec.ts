import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditProvidersComponent } from './new-edit-providers.component';

describe('NewEditProvidersComponent', () => {
  let component: NewEditProvidersComponent;
  let fixture: ComponentFixture<NewEditProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
