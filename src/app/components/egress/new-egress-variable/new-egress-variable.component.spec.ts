import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEgressVariableComponent } from './new-egress-variable.component';

describe('NewEgressVariableComponent', () => {
  let component: NewEgressVariableComponent;
  let fixture: ComponentFixture<NewEgressVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEgressVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEgressVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
